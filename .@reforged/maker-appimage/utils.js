"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setChecksum = exports.getImageMetadata = exports.mapHash = exports.mapArch = exports.joinFiles = exports.mkSquashFs = exports.copyPath = exports.generateDesktop = void 0;
const events_1 = __importDefault(require("events"));
const crypto_1 = require("crypto");
function generateDesktop(desktopEntry, actions) {
    function toEscapeSeq(string) {
        if (typeof string === "string")
            return string
                .replaceAll(/\\(?!["`trn])/g, "\\\\")
                .replaceAll("`", "\\`")
                .replaceAll("\t", "\\t")
                .replaceAll("\r", "\\r")
                .replaceAll("\n", "\\n");
        return string;
    }
    const template = { desktop: [], actions: [] };
    let actionsKey = null;
    template.desktop.push('[Desktop Entry]');
    for (const entry of Object.entries(desktopEntry))
        if (entry[0] !== "Actions" && entry[1] !== undefined && entry[1] !== null)
            template.desktop.push(entry.map(v => toEscapeSeq(v)).join('='));
    if (actions)
        for (const [name, record] of Object.entries(actions))
            if (/[a-zA-Z]/.test(name)) {
                actionsKey === null ? actionsKey = name : actionsKey += ";" + name;
                template.actions.push('\n[Desktop Action ' + name + ']');
                for (const entry of Object.entries(record))
                    if (entry[1] !== undefined && entry[1] !== null)
                        template.actions.push(entry.map(v => toEscapeSeq(v)).join('='));
            }
    if (actionsKey)
        template.desktop.push("Actions=" + actions);
    return template.desktop.join('\n') + '\n' + template.actions.join('\n');
}
exports.generateDesktop = generateDesktop;
/**
 * Asynchroniously copy path from `source` to `destination`, with similar logic
 * to Unix `cp -R` command.
 */
async function copyPath(source, destination, dirmode = 0o644) {
    const fs = Promise.all([import("fs"), import("fs/promises")])
        .then(([sync, async]) => ({ ...sync, ...async }));
    const resolve = import("path").then(path => path.resolve);
    async function copyDirRecursively(source, destination) {
        const jobs = [];
        const items = await (await fs).readdir(source);
        const mode = typeof dirmode === "function" ? dirmode(source, destination) : dirmode;
        await (await fs).mkdir(destination, await mode);
        for (const item of items) {
            const itemPath = {
                src: (await resolve)(source, item),
                dest: (await resolve)(destination, item)
            };
            jobs.push((await fs).lstat(itemPath.src).then(async (stats) => {
                if (stats.isDirectory())
                    await copyDirRecursively(itemPath.src, itemPath.dest);
                else {
                    await (await fs).copyFile(itemPath.src, itemPath.dest);
                }
            }));
        }
        return void await Promise.all(jobs);
    }
    const stats = (await fs).lstat(source);
    const resolvedDestination = destination.endsWith("/") || (await fs).existsSync(destination) ?
        import("path").then(path => path.resolve(destination, path.basename(source))) :
        destination;
    if ((await stats).isDirectory()) {
        return copyDirRecursively(source, await resolvedDestination);
    }
    else {
        return (await fs).copyFile(source, await resolvedDestination);
    }
}
exports.copyPath = copyPath;
/**
 * Raw bindings to `mksquashfs` binary.
 *
 * @returns An event used to watch for `mksquashfs` changes, including the job progress (in percent – as float number).
 */
function mkSquashFs(...squashfsOptions) {
    const event = new events_1.default();
    import("child_process").then(child => child.spawn)
        .then(spawn => {
        const mkSquashFS = spawn("mksquashfs", squashfsOptions);
        let lastProgress = 0;
        mkSquashFS.stdout.on("data", (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                const message = chunk.toString();
                const progress = message.match(/\] [0-9/]+ ([0-9]+)%/)?.[1];
                if (progress !== undefined) {
                    const progInt = Number(progress);
                    if (progInt >= 0 && progInt <= 100 &&
                        progInt !== lastProgress && event.emit("progress", progInt / 100))
                        lastProgress = progInt;
                }
            }
        });
        mkSquashFS.on('close', (...args) => event.emit("close", ...args));
        mkSquashFS.on('error', (error) => event.emit("error", error));
    });
    return event;
}
exports.mkSquashFs = mkSquashFs;
/**
 * Concatenates files and/or buffers into single buffer.
 */
async function joinFiles(...filesAndBuffers) {
    const { readFile } = await import("fs/promises");
    const bufferArray = [];
    for (const path of filesAndBuffers)
        if (Buffer.isBuffer(path))
            bufferArray.push(Promise.resolve(path));
        else
            bufferArray.push(readFile(path));
    return Promise.all(bufferArray).then(array => Buffer.concat(array));
}
exports.joinFiles = joinFiles;
/**
 * Maps Node.js architecture to the AppImage-friendly format.
 */
function mapArch(arch) {
    switch (arch) {
        /*________________________________________________________________________*/
        /*  [Forge]    :                     [AppImage]                           */
        case "x64": return "x86_64";
        case "ia32": return "i686";
        case "arm64": return "aarch64";
        case "armv7l": return "armhf";
        default: throw new Error("Unsupported architecture: '" + arch + "'.");
        /*________________________________________________________________________*/
        /*                                                                        */
    }
}
exports.mapArch = mapArch;
/**
 * An object which maps files to their MD5 hashes.
 *
 * **Note:** Checksums are valid only for the assets of AppImageKit `13`.
 */
exports.mapHash = Object.freeze({
    runtime: Object.freeze({
        x86_64: "37d6f0bc41f143c8c0376e874769e20a",
        i686: "498c198765ebb914e43713af4f85c5a9",
        aarch64: "d41d8cd98f00b204e9800998ecf8427e",
        armhf: "85b929e78dc59098928df1655b4b7963"
    }),
    AppRun: Object.freeze({
        x86_64: "91b81afc501f78761adbf3bab49b0590",
        i686: "a16e8b7d1052a388bb9fd1e42d790434",
        aarch64: "e991d36711f99097e5c46deabb0c84a9",
        armhf: "4e7401fd36d3d4afa4963bf0a8e08221"
    })
});
/**
 * A function to validate if the type of any value is like the one in
 * {@link ImageMetadata} interface.
 *
 * @param meta Any value to validate the type of.
 * @returns Whenever `meta` is an {@link ImageMetadata}-like object.
 */
function validateImageMetadata(meta) {
    if (typeof meta !== "object" || meta === null)
        return false;
    if (!("type" in meta) || (meta.type !== "PNG" && meta.type !== "SVG"))
        return false;
    if (!("width" in meta) || (typeof meta.width !== "number" && meta.width !== null))
        return false;
    if (!("height" in meta) || (typeof meta.height !== "number" && meta.height !== null))
        return false;
    return true;
}
/**
 * A function to fetch metadata from buffer in PNG or SVG format.
 *
 * @remarks
 *
 * For PNGs, it gets required information (like image width or height)
 * from IHDR header (if it is correct according to spec), otherwise it sets
 * dimention values to `null`.
 *
 * For SVGs, it gets information about the dimensions from `<svg>` tag. If it is
 * missing, this function will return `null` for `width` and/or `height`.
 *
 * This function will also recognize file formats based on *MAGIC* headers – for
 * SVGs, it looks for existance of `<svg>` tag, for PNGs it looks if file starts
 * from the specific bytes.
 *
 * @param image PNG/SVG/XPM image buffer.
 */
function getImageMetadata(image) {
    const svgMagic = {
        file: /<svg ?[^>]*>/,
        width: /<svg (?!width).*.width=["']?(\d+)(?:px)?["']?[^>]*>/,
        height: /<svg (?!height).*.height=["']?(\d+)(?:px)?["']?[^>]*>/
    };
    const partialMeta = {};
    if (image.readUInt32BE() === 2303741511 /* FileHeader.PNG */)
        partialMeta["type"] = "PNG";
    else if (image.readUInt32BE(2) === 1481657650 /* FileHeader.XPM2 */)
        partialMeta["type"] = "XPM2";
    else if (image.readUInt32BE(3) === 1481657632 /* FileHeader.XPM3 */)
        partialMeta["type"] = "XPM3";
    else if (svgMagic.file.test(image.toString("utf8")))
        partialMeta["type"] = "SVG";
    else
        throw Error("Unsupported image format (FreeDesktop spec expects images only of following MIME type: PNG, SVG and XPM).");
    switch (partialMeta.type) {
        // Based on specification by W3C: https://www.w3.org/TR/PNG/
        case "PNG": {
            const prefixIHDR = 4 + image.indexOf("IHDR");
            const rawMeta = {
                width: prefixIHDR === 3 ? null : image.readInt32BE(prefixIHDR),
                height: prefixIHDR === 3 ? null : image.readInt32BE(prefixIHDR + 4)
            };
            partialMeta["width"] = (rawMeta.width ?? 0) === 0 ? null : rawMeta.width;
            partialMeta["height"] = (rawMeta.height ?? 0) === 0 ? null : rawMeta.height;
            break;
        }
        case "SVG": {
            const svgImage = image.toString("utf8");
            const rawMeta = {
                width: parseInt(svgImage.match(svgMagic.width)?.[1] ?? ""),
                heigth: parseInt(svgImage.match(svgMagic.height)?.[1] ?? ""),
            };
            partialMeta["width"] = isNaN(rawMeta["width"]) ? null : rawMeta["width"];
            partialMeta["height"] = isNaN(rawMeta["heigth"]) ? null : rawMeta["heigth"];
            break;
        }
        default:
            if (typeof partialMeta["type"] === "string")
                throw new Error(`Not yet supported image format: '${partialMeta["type"]}'.`);
            else
                throw new TypeError(`Invalid type of 'partialMeta.type': '${typeof partialMeta["type"]}' (should be 'string')`);
    }
    if (validateImageMetadata(partialMeta))
        return partialMeta;
    throw new TypeError("Malformed function return type! (" + JSON.stringify(partialMeta) + ").");
}
exports.getImageMetadata = getImageMetadata;
function setChecksum(runtime, squashfs) {
    if (!(0, crypto_1.getHashes)().includes("md5"))
        throw new Error("Current Node.js binary doesn't support \"md5\" digest algorithm.");
    const hashHeader = ".digest_md5";
    const buffer = runtime instanceof Buffer ? runtime : Buffer.from(runtime);
    const hashOffset = buffer.indexOf(hashHeader) + hashHeader.length;
    const [pre, post] = [buffer.subarray(0, hashOffset), buffer.subarray(hashOffset)];
    return Buffer.concat([
        pre,
        (0, crypto_1.createHash)("md5").update(squashfs).digest(),
        post
    ]);
}
exports.setChecksum = setChecksum;
//# sourceMappingURL=utils.js.map