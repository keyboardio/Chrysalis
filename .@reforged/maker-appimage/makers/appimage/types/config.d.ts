interface MakerAppImageConfigOptions {
    /**
     * Name of the package (used as folder name, `X-AppImage-Name` etc).
     * It should contain only lowercase letters and hypens. It should also start
     * from a letter and contain at least one character.
     * 
     * If above requirements aren't met, maker will approach to sanitize the
     * string to match the required format. This process might fail if
     * the string is nowhere close to match the requirements, so the one
     * shouldn't depend on the sanitizer when setting the `name` property on
     * their own.
     * 
     * Defaults to sanitized `packageJSON.name`.
     */
    name?: string,
    /**
     * Name of the executable to put into the `Exec` field of generated
     * `.desktop` file.
     * 
     * Defaults to `options.name`.
     */
    bin?: string,
    /**
     * Human-friendly name of the application.
     * 
     * Defaults to `packageJSON.productName`.
     */
    productName?: string,
    /**
     * Generic name of the application used in `.desktop` file.
     */
    genericName?: string,
    /**
     * Path to icon to use for the AppImage.
     */
    icon?: string,
    /**
     * List of dekstop file categories to append.
     */
    categories?: (
        FreeDesktopCategories["main"] | FreeDesktopCategories["additional"]
    )[],
    /**
     * Actions to be used within a generated desktop file.
     */
    actions?: Record<string, Partial<Record<string,string|null>> & {
        /** Action's user-friendly name */
        Name: string,
        /** A path to action icon */
        Icon?: string|null,
        /** A command to execute on a desktop file action */
        Exec?: string|null
    }>
    /**
     * Path to desktop file to be used instead of generating a new one.
     */
    desktopFile?: string,
    /**
     * Whenever calculate and embed MD5 digest in the runtime.
     * 
     * Currently functions as a placeholder for future API – **NO-OP**.
     * 
     * @internal
     * @experimental
     */
    digestMd5?: boolean,
    /**
     * Use given compressor for SquashFS filesystem.
     * 
     * Defaults to `mksquasfs` binary defaults (usually `gzip`).
     */
    compressor?: "xz"|"gzip"|"lz4"|"lzo"|"zstd"|"lzma"
    /**
     * GitHub Release of `AppImage/AppImageKit` from which this maker should
     * get the runtime and AppRun executable. 
     * 
     * Defaults to `13`.
     */
    AppImageKitRelease?: number | `${number}` | "continuous"
}

export interface MakerAppImageConfig {
    /**
     * AppImage maker configuration options.
     */
    options?: MakerAppImageConfigOptions
}

/**
 * FreeDesktop software categories, grouped as in FreeDesktop specification.
 * 
 * @privateRemarks
 * 
 * Generated using DevTools with:
 * ```js
 * const out = [];
 * for(const td of document.querySelectorAll("table.informaltable>tbody>tr>td:first-child"))
 *     out.push('"'+td.innerText+'"');
 * console.log(out.join(' | '));
 * ```
 */
 interface FreeDesktopCategories {
    /** Categories that every desktop confirming enviroment **must** support. */
    main: (
        "AudioVideo" | "Audio" | "Video" | "Development" | "Education" |
        "Game" | "Graphics" | "Network" | "Office" | "Science" | "Settings" |
        "System" | "Utility"
    );
    /**
     * Categories that provide more fine grained information about the
     * application.
     */
    additional: (
        "Building" | "Debugger" | "IDE" | "GUIDesigner" | "Profiling" |
        "RevisionControl" | "Translation" | "Calendar" | "Database" |
        "Dictionary" | "Email" | "Finance" | `${"Flow"|""}Chart` | "PDA" |
        "Presentation" | "Spreadsheet" | "WordProcessor" | "Scanning" | "OCR" |
        "Photography" | `${"Contact"|"Project"}Management` |
        `${"2D"|"3D"|"Vector"|"Raster"}Graphics` | "Publishing" | "Viewer" |
        `Text${"Tools"|"Editor"}` | "DesktopSettings" | "HardwareSettings" |
        "Printing" | "PackageManager" | "Dialup" | "InstantMessaging" | "Chat" |
        "IRCClient" | "Feed" | "FileTransfer" | "HamRadio" | "News" | "P2P" |
        "RemoteAccess" | `Telephony${""|"Tools"}` | "VideoConference" |
        `Web${"Browser"|"Development"}` | "Midi" | "Mixer" | "Sequencer" |
        "Tuner" | "TV" | "AudioVideoEditing" | "Player" | "Recorder" |
        "DiscBurning"  | "RolePlaying" | "Shooter" | `${"Action" | "Adventure" |
        "Arcade" | "Board" | "Blocs" | "Card" | "Kids" | "Logic" | "Sports" |
        "Strategy"}Game` | "Simulation" | "Art" | "Construction" | "Music" |
        "Languages" | "ArtificialIntelligence" | "Astronomy" | "Biology" |
        "Chemistry" | "ComputerScience" | "DataVisualization" | "Economy" |
        "Electricity" | `Geo${"graphy"|"logy"|"science"}` | "History" |
        "Humanities" | "ImageProcessing" | "Literature" | "Maps" | "Math" |
        "NumericalAnalysis" | "MedicalSoftware" | "Physics" | "Robotics" |
        "Spirituality" |"Sports" |"ParallelComputing" | "Amusement" |
        "Archiving" | "Compression" | "Electronics" | "Engineering" |
        `File${"Tools"|"Manager"|"system"}` | "Monitor" | "Security" |
        `${""|"Terminal"}Emulator` | "Accessibility" | "Calculator" | "Clock" |
        "Documentation" | "Adult" | "Core" | "KDE" | "GNOME" | "XFCE" | "GTK" |
        "Qt" | "Motif" | "Java" | "ConsoleOnly"
    );
}