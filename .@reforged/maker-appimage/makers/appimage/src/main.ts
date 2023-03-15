(process as {setSourceMapsEnabled?:(arg0:boolean)=>void}).setSourceMapsEnabled?.(true);

import { createHash } from "crypto";
import { tmpdir } from "os";
import { resolve, dirname, extname, relative } from "path";
import {
  mkdtempSync,
  existsSync,
  rmSync
} from "fs";
import {
  mkdir,
  writeFile,
  copyFile,
  readFile,
  chmod,
  symlink
} from "fs/promises";

import MakerBase from "@electron-forge/maker-base";
import sanitizeName from "@spacingbat3/lss";

import {
  copyPath,
  generateDesktop,
  joinFiles,
  mkSquashFs,
  mapArch,
  mapHash,
  getImageMetadata
} from "./utils"
import type { MakerAppImageConfig } from "../types/config";
import type { MakerMeta } from "./utils";
/**
 * A fetch-alike implementation used in this module, will be native API if
 * present or otherwise `node-fetch`.
 */
const nodeFetch = (() => {
  const fetchModule = import("node-fetch").then(fetch => fetch.default);
  if((globalThis as {fetch?:Awaited<typeof fetchModule>}).fetch !== undefined)
    return (url:string)=>(globalThis as unknown as {fetch:Awaited<typeof fetchModule>}).fetch(url)
  return async (url:string) => (await fetchModule)(url);
})()

const enum RemoteDefaults {
  /** Default URL from which AppImageKit distributables are downloaded. */
  Mirror = 'https://github.com/AppImage/AppImageKit/releases/download/',
  /** Currently supported release of AppImageKit distributables. */
  Tag = 13,
  Dir = "{{ version }}",
  FileName = "{{ filename }}-{{ arch }}",

}

export default class MakerAppImage<C extends MakerAppImageConfig> extends MakerBase<C> {
  defaultPlatforms = ["linux"];
  name = "AppImage";
  override isSupportedOnCurrentPlatform = () => true;
  override requiredExternalBinaries = ["mksquashfs"];
  override async make({appName,dir,makeDir,packageJSON,targetArch}: MakerMeta) {
    const {
      actions,
      categories,
      compressor,
      genericName
    } = (this.config.options ?? {});
    const appImageArch = mapArch(targetArch);
    function parseMirror(string:string,version:typeof currentTag,filename:string|null=null) {
      string = string
        .replaceAll(/{{ *version *}}/g,`${version}`)
        .replaceAll(/{{ *arch *}}/g,appImageArch)
        .replaceAll(/{{ *node.arch *}}/g,targetArch);
      if(filename !== null)
        string = string.replaceAll(/{{ *filename *}}/g, filename);
      return string;
    }
    /** A URL-like object from which assets will be downloaded. */
    const remote = {
      mirror: process.env["REFORGED_APPIMAGEKIT_MIRROR"] ?? process.env["APPIMAGEKIT_MIRROR"] ?? RemoteDefaults.Mirror,
      dir: process.env["REFORGED_APPIMAGEKIT_CUSTOM_DIR"] ?? process.env["APPIMAGEKIT_CUSTOM_DIR"] ?? RemoteDefaults.Dir,
      file: process.env["REFORGED_APPIMAGEKIT_CUSTOM_FILENAME"] ?? process.env["APPIMAGEKIT_CUSTOM_FILENAME"] ?? RemoteDefaults.FileName
    };
    /** Node.js friendly name of the application. */
    const name = sanitizeName(this.config.options?.name ?? packageJSON.name as string),
      /** Name of binary, used for shell script generation and `Exec` values. */
      bin = this.config.options?.bin ?? name,
      binShell = bin.replaceAll(/(?<!\\)"/g,'\\"'),
      /** Human-friendly application name. */
      productName = this.config.options?.productName ?? appName,
      /** A path to application's icon. */
      icon = this.config?.options?.icon ?? null,
      /** Resolved path to AppImage output file. */
      outFile = resolve(makeDir, this.name, targetArch, `${productName}-${packageJSON.version}-${targetArch}.AppImage`),
      /** A currently used AppImageKit release. */
      currentTag = this.config.options?.AppImageKitRelease ?? RemoteDefaults.Tag,
      /**
       * Detailed information about the source files.
       * 
       * As of remote content, objects contain the data in form of
       * ArrayBuffers (which are then allocated to Buffers,
       * checksum-verified and saved as regular files). The text-based
       * generated content is however saved in form of the string (UTF-8
       * encoded, with LF endings).
       */
      sources = {
        /** Details about the AppImage runtime. */
        runtime: {
          data: nodeFetch(parseMirror(`${remote.mirror}${remote.dir}/${remote.file}`,currentTag,"runtime"))
            .then(response => {
              if(response.ok)
                return response.arrayBuffer()
              else
                throw new Error("AppRun request failure.")
            }),
          md5: mapHash.runtime[mapArch(targetArch)]
        },
        /** Details about AppRun ELF executable, used to start the app. */
        AppRun: {
          data: nodeFetch(parseMirror(`${remote.mirror}${remote.dir}/${remote.file}`,currentTag,"AppRun"))
            .then(response => {
              if(response.ok)
                return response.arrayBuffer()
              else
                throw new Error("AppRun request failure.")
            }),
          md5: mapHash.AppRun[mapArch(targetArch)]
        },
        /** Details about the generated `.desktop` file. */
        desktop: typeof this.config.options?.desktopFile === "string" ?
          readFile(this.config.options.desktopFile, "utf-8") :
          Promise.resolve(generateDesktop({
            Version: "1.5",
            Type: "Application",
            Name: productName,
            GenericName: genericName,
            Exec: `${bin.includes(" ") ? `"${binShell}"` : bin} %U`,
            Icon: icon ? name : undefined,
            Categories: categories ?
              categories.join(';')+';' :
              undefined,
            "X-AppImage-Name": name,
            "X-AppImage-Version": packageJSON.version,
            "X-AppImage-Arch": mapArch(targetArch)
          }, actions)),
        /** Shell script used to launch the application. */
        shell: [
          '#!/bin/sh',
          // Normalized string to 'usr/' in the AppImage.
          'USR="$(echo "$0" | sed \'s/\\/\\/*/\\//g;s/\\/$//;s/\\/[^/]*\\/[^/]*$//\')"',
          // Executes the binary and passes arguments to it.
          'if [ -n "$WAYLAND_DISPLAY" ]; then',
          '  set -- --enable-features=UseOzonePlatform --ozone-platform=wayland --disable-gpu "$@"',
          'fi',
          //
          'if [ -e /proc/sys/kernel/unprivileged_userns_clone ]; then',
          '    if ! grep -qFx 1 /proc/sys/kernel/unprivileged_userns_clone; then',
          '        set -- --no-sandbox "$@"',
          '    fi',
          'else',
          '    set -- --no-sandbox "$@"',
          'fi',
          `exec "\$USR/lib/${name}/${binShell}" "\$@"`
        ].join('\n')
      };
    this.ensureFile(outFile);
    // Verify if there's a `bin` file in packaged application.
    if(!existsSync(resolve(dir, bin)))
      throw new Error([
        `Could not find executable '${bin}' in packaged application`,
        "Make sure 'packagerConfig.execName' in Forge configuration or",
        "'options.bin' in this maker are pointing to valid file."
      ].join(" "));
    /** A temporary directory used for the packaging. */
    const workDir = mkdtempSync(resolve(tmpdir(), `.${productName}-${packageJSON.version}-${targetArch}-`));
    const iconMeta = icon ? readFile(icon).then(icon => getImageMetadata(icon)) : Promise.resolve(undefined);
    {
      let cleanup = () => {
        cleanup = () => {};
        rmSync(workDir, {recursive: true});
      }
      process.on("uncaughtExceptionMonitor", cleanup);
      process.on("exit", cleanup);
    }
    process.on("SIGINT", () => {
      console.error("User interrupted the process.");
      process.exit(130);
    })
    const directories = {
      lib: resolve(workDir, 'usr/lib/'),
      data: resolve(workDir, 'usr/lib/', name),
      bin: resolve(workDir, 'usr/bin'),
      icons: iconMeta.then(meta => meta && meta.width && meta.height ?
        resolve(workDir, 'usr/share/icons/hicolor', meta.width.toFixed(0)+'x'+meta.height.toFixed(0)) :
        null
      )
    }
    const iconPath = icon ? resolve(workDir, name+extname(icon)) : undefined;
    /** First-step jobs, which does not depend on any other job. */
    const earlyJobs = [
      // Create further directory tree (0,1,2)
      mkdir(directories.lib, {recursive: true, mode: 0o755}),
      mkdir(directories.bin, {recursive: true, mode: 0o755}),
      directories.icons
        .then(path => path ? mkdir(path, {recursive: true, mode: 0o755}).then(() => path) : undefined),
      // Save `.desktop` to file (3)
      sources.desktop
        .then(data => writeFile(
          resolve(workDir, productName+'.desktop'), data, {mode:0o755, encoding: "utf-8"})
        ),
      // Verify and save `AppRun` to file (4)
      sources.AppRun.data
        .then(data => {
          const buffer = Buffer.from(data);
          if(currentTag === RemoteDefaults.Tag) {
            const hash = createHash("md5")
              .update(buffer)
              .digest('hex');
            if(hash !== sources.AppRun.md5)
              throw new Error("AppRun hash mismatch.");
          }
          return writeFile(resolve(workDir, 'AppRun'), buffer, {mode: 0o755});
        }),
      // Save icon to file and symlink it as `.DirIcon` (5)
      icon && iconPath && existsSync(icon) ?
        copyFile(icon, iconPath)
          .then(() => symlink(relative(workDir, iconPath), resolve(workDir, ".DirIcon"), 'file'))
        : Promise.reject(Error("Invalid icon / icon path.")),
    ] as const;
    const lateJobs = [
      // Write shell script to file
      earlyJobs[1]
        .then(() => writeFile(resolve(directories.bin, bin),sources.shell, {mode: 0o755})),
      // Copy Electron app to AppImage directories
      earlyJobs[0]
        .then(() => copyPath(dir, directories.data, 0o755)),
      // Copy icon to `usr` directory whenever possible
      Promise.all([earlyJobs[2],earlyJobs[5]])
        .then(([path]) => icon && path ?
          copyFile(icon, resolve(path,name+extname(icon))) :
          void 0
        ),
      // Ensure that root folder has proper file mode
      chmod(workDir, 0o755)
    ] as const;
    // Wait for early/late jobs to finish
    await(Promise.all([...earlyJobs,...lateJobs]));
    // Run `mksquashfs` and wait for it to finish
    const mkSquashFsArgs:string[] = [
      workDir,
      outFile,
      "-noappend",
      "-all-root",
      "-all-time",
      "0",
      "-mkfs-time",
      "0"
    ];
    if(compressor)
      mkSquashFsArgs.push("-comp", compressor);
    if(compressor === "xz")
      mkSquashFsArgs.push(
        // Defaults for `xz` took from AppImageTool:
        "-Xdict-size",
        "100%",
        "-b",
        "16384"
      );
    await new Promise((resolve, reject) => {
      mkdir(dirname(outFile), {recursive: true}).then(() => {
        mkSquashFs(...mkSquashFsArgs)
        .once("close", () => resolve(undefined))
        .once("error", (error) => reject(error));
      }).catch(error => reject(error));
    });
    // Append runtime to SquashFS image and wait for that task to finish
    await sources.runtime.data
      //TODO: Find how properly embed MD5 or SHA256 signatures
      /*.then(
        async runtime => config.options?.digestMd5??true ?
          setChecksum(runtime, await readFile(outFile)) :
          runtime
      )*/
      .then(runtime => joinFiles(Buffer.from(runtime),outFile))
      .then(buffer => writeFile(outFile, buffer))
      .then(() => chmod(outFile, 0o755))
    // Finally, return a path to maker artifacts
    return [outFile];
  }
}
export {
  MakerAppImage,
  MakerAppImageConfig
};
