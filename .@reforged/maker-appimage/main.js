"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakerAppImage = void 0;
process.setSourceMapsEnabled?.(true);
const crypto_1 = require("crypto");
const os_1 = require("os");
const path_1 = require("path");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const maker_base_1 = __importDefault(require("@electron-forge/maker-base"));
const lss_1 = __importDefault(require("@spacingbat3/lss"));
const utils_1 = require("./utils");
/**
 * A fetch-alike implementation used in this module, will be native API if
 * present or otherwise `node-fetch`.
 */
const nodeFetch = (() => {
    const fetchModule = import("node-fetch").then(fetch => fetch.default);
    if (globalThis.fetch !== undefined)
        return (url) => globalThis.fetch(url);
    return async (url) => (await fetchModule)(url);
})();
class MakerAppImage extends maker_base_1.default {
    defaultPlatforms = ["linux"];
    name = "AppImage";
    isSupportedOnCurrentPlatform = () => true;
    requiredExternalBinaries = ["mksquashfs"];
    async make({ appName, dir, makeDir, packageJSON, targetArch }) {
        const { actions, categories, compressor, genericName } = (this.config.options ?? {});
        const appImageArch = (0, utils_1.mapArch)(targetArch);
        function parseMirror(string, version, filename = null) {
            string = string
                .replaceAll(/{{ *version *}}/g, `${version}`)
                .replaceAll(/{{ *arch *}}/g, appImageArch)
                .replaceAll(/{{ *node.arch *}}/g, targetArch);
            if (filename !== null)
                string = string.replaceAll(/{{ *filename *}}/g, filename);
            return string;
        }
        /** A URL-like object from which assets will be downloaded. */
        const remote = {
            mirror: process.env["REFORGED_APPIMAGEKIT_MIRROR"] ?? process.env["APPIMAGEKIT_MIRROR"] ?? "https://github.com/AppImage/AppImageKit/releases/download/" /* RemoteDefaults.Mirror */,
            dir: process.env["REFORGED_APPIMAGEKIT_CUSTOM_DIR"] ?? process.env["APPIMAGEKIT_CUSTOM_DIR"] ?? "{{ version }}" /* RemoteDefaults.Dir */,
            file: process.env["REFORGED_APPIMAGEKIT_CUSTOM_FILENAME"] ?? process.env["APPIMAGEKIT_CUSTOM_FILENAME"] ?? "{{ filename }}-{{ arch }}" /* RemoteDefaults.FileName */
        };
        /** Node.js friendly name of the application. */
        const name = (0, lss_1.default)(this.config.options?.name ?? packageJSON.name), 
        /** Name of binary, used for shell script generation and `Exec` values. */
        bin = this.config.options?.bin ?? name, binShell = bin.replaceAll(/(?<!\\)"/g, '\\"'), 
        /** Human-friendly application name. */
        productName = this.config.options?.productName ?? appName, 
        /** A path to application's icon. */
        icon = this.config?.options?.icon ?? null, 
        /** Resolved path to AppImage output file. */
        outFile = (0, path_1.resolve)(makeDir, this.name, targetArch, `${productName}-${packageJSON.version}-${targetArch}.AppImage`), 
        /** A currently used AppImageKit release. */
        currentTag = this.config.options?.AppImageKitRelease ?? 13 /* RemoteDefaults.Tag */, 
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
                data: nodeFetch(parseMirror(`${remote.mirror}${remote.dir}/${remote.file}`, currentTag, "runtime"))
                    .then(response => {
                    if (response.ok)
                        return response.arrayBuffer();
                    else
                        throw new Error("AppRun request failure.");
                }),
                md5: utils_1.mapHash.runtime[(0, utils_1.mapArch)(targetArch)]
            },
            /** Details about AppRun ELF executable, used to start the app. */
            AppRun: {
                data: nodeFetch(parseMirror(`${remote.mirror}${remote.dir}/${remote.file}`, currentTag, "AppRun"))
                    .then(response => {
                    if (response.ok)
                        return response.arrayBuffer();
                    else
                        throw new Error("AppRun request failure.");
                }),
                md5: utils_1.mapHash.AppRun[(0, utils_1.mapArch)(targetArch)]
            },
            /** Details about the generated `.desktop` file. */
            desktop: typeof this.config.options?.desktopFile === "string" ?
                (0, promises_1.readFile)(this.config.options.desktopFile, "utf-8") :
                Promise.resolve((0, utils_1.generateDesktop)({
                    Version: "1.5",
                    Type: "Application",
                    Name: productName,
                    GenericName: genericName,
                    Exec: `${bin.includes(" ") ? `"${binShell}"` : bin} %U`,
                    Icon: icon ? name : undefined,
                    Categories: categories ?
                        categories.join(';') + ';' :
                        undefined,
                    "X-AppImage-Name": name,
                    "X-AppImage-Version": packageJSON.version,
                    "X-AppImage-Arch": (0, utils_1.mapArch)(targetArch)
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
        if (!(0, fs_1.existsSync)((0, path_1.resolve)(dir, bin)))
            throw new Error([
                `Could not find executable '${bin}' in packaged application`,
                "Make sure 'packagerConfig.execName' in Forge configuration or",
                "'options.bin' in this maker are pointing to valid file."
            ].join(" "));
        /** A temporary directory used for the packaging. */
        const workDir = (0, fs_1.mkdtempSync)((0, path_1.resolve)((0, os_1.tmpdir)(), `.${productName}-${packageJSON.version}-${targetArch}-`));
        const iconMeta = icon ? (0, promises_1.readFile)(icon).then(icon => (0, utils_1.getImageMetadata)(icon)) : Promise.resolve(undefined);
        {
            let cleanup = () => {
                cleanup = () => { };
                (0, fs_1.rmSync)(workDir, { recursive: true });
            };
            process.on("uncaughtExceptionMonitor", cleanup);
            process.on("exit", cleanup);
        }
        process.on("SIGINT", () => {
            console.error("User interrupted the process.");
            process.exit(130);
        });
        const directories = {
            lib: (0, path_1.resolve)(workDir, 'usr/lib/'),
            data: (0, path_1.resolve)(workDir, 'usr/lib/', name),
            bin: (0, path_1.resolve)(workDir, 'usr/bin'),
            icons: iconMeta.then(meta => meta && meta.width && meta.height ?
                (0, path_1.resolve)(workDir, 'usr/share/icons/hicolor', meta.width.toFixed(0) + 'x' + meta.height.toFixed(0)) :
                null)
        };
        const iconPath = icon ? (0, path_1.resolve)(workDir, name + (0, path_1.extname)(icon)) : undefined;
        /** First-step jobs, which does not depend on any other job. */
        const earlyJobs = [
            // Create further directory tree (0,1,2)
            (0, promises_1.mkdir)(directories.lib, { recursive: true, mode: 0o755 }),
            (0, promises_1.mkdir)(directories.bin, { recursive: true, mode: 0o755 }),
            directories.icons
                .then(path => path ? (0, promises_1.mkdir)(path, { recursive: true, mode: 0o755 }).then(() => path) : undefined),
            // Save `.desktop` to file (3)
            sources.desktop
                .then(data => (0, promises_1.writeFile)((0, path_1.resolve)(workDir, productName + '.desktop'), data, { mode: 0o755, encoding: "utf-8" })),
            // Verify and save `AppRun` to file (4)
            sources.AppRun.data
                .then(data => {
                const buffer = Buffer.from(data);
                if (currentTag === 13 /* RemoteDefaults.Tag */) {
                    const hash = (0, crypto_1.createHash)("md5")
                        .update(buffer)
                        .digest('hex');
                    if (hash !== sources.AppRun.md5)
                        throw new Error("AppRun hash mismatch.");
                }
                return (0, promises_1.writeFile)((0, path_1.resolve)(workDir, 'AppRun'), buffer, { mode: 0o755 });
            }),
            // Save icon to file and symlink it as `.DirIcon` (5)
            icon && iconPath && (0, fs_1.existsSync)(icon) ?
                (0, promises_1.copyFile)(icon, iconPath)
                    .then(() => (0, promises_1.symlink)((0, path_1.relative)(workDir, iconPath), (0, path_1.resolve)(workDir, ".DirIcon"), 'file'))
                : Promise.reject(Error("Invalid icon / icon path.")),
        ];
        const lateJobs = [
            // Write shell script to file
            earlyJobs[1]
                .then(() => (0, promises_1.writeFile)((0, path_1.resolve)(directories.bin, bin), sources.shell, { mode: 0o755 })),
            // Copy Electron app to AppImage directories
            earlyJobs[0]
                .then(() => (0, utils_1.copyPath)(dir, directories.data, 0o755)),
            // Copy icon to `usr` directory whenever possible
            Promise.all([earlyJobs[2], earlyJobs[5]])
                .then(([path]) => icon && path ?
                (0, promises_1.copyFile)(icon, (0, path_1.resolve)(path, name + (0, path_1.extname)(icon))) :
                void 0),
            // Ensure that root folder has proper file mode
            (0, promises_1.chmod)(workDir, 0o755)
        ];
        // Wait for early/late jobs to finish
        await (Promise.all([...earlyJobs, ...lateJobs]));
        // Run `mksquashfs` and wait for it to finish
        const mkSquashFsArgs = [
            workDir,
            outFile,
            "-noappend",
            "-all-root",
            "-all-time",
            "0",
            "-mkfs-time",
            "0"
        ];
        if (compressor)
            mkSquashFsArgs.push("-comp", compressor);
        if (compressor === "xz")
            mkSquashFsArgs.push(
            // Defaults for `xz` took from AppImageTool:
            "-Xdict-size", "100%", "-b", "16384");
        await new Promise((resolve, reject) => {
            (0, promises_1.mkdir)((0, path_1.dirname)(outFile), { recursive: true }).then(() => {
                (0, utils_1.mkSquashFs)(...mkSquashFsArgs)
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
            .then(runtime => (0, utils_1.joinFiles)(Buffer.from(runtime), outFile))
            .then(buffer => (0, promises_1.writeFile)(outFile, buffer))
            .then(() => (0, promises_1.chmod)(outFile, 0o755));
        // Finally, return a path to maker artifacts
        return [outFile];
    }
}
exports.default = MakerAppImage;
exports.MakerAppImage = MakerAppImage;
//# sourceMappingURL=main.js.map
