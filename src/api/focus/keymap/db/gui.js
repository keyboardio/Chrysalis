const GuiLabels = {
  linux: { full: "Super", "1u": "Sup.", short: "Su" },
  win32: { full: "Windows", "1u": "Win", short: "⊞" },
  darwin: { full: "Command", "1u": "Cmd", short: "⌘" },
  default: { full: "Gui", "1u": "Gui", short: "G" },
};

const getPlatformLabels = () => {
  const platform = navigator.platform.toLowerCase();
  const macosPrefix = "mac";
  const windowsPrefixes = ["win"];
  const iosPrefixes = ["iphone", "ipad", "ipod"];
  const linuxPrefix = "linux";
  const androidPrefix = "android";

  if (platform.startsWith(macosPrefix)) {
    return GuiLabels.darwin;
  } else if (iosPrefixes.some((prefix) => platform.startsWith(prefix))) {
    return GuiLabels.darwin;
  } else if (windowsPrefixes.some((prefix) => platform.startsWith(prefix))) {
    return GuiLabels.win32;
  } else if (platform.startsWith(androidPrefix)) {
    return GuiLabels.default;
  } else if (platform.startsWith(linuxPrefix)) {
    return GuiLabels.linux;
  } else {
    return GuiLabels.default;
  }
};

export const GuiLabel = getPlatformLabels();

export const GuiShortLabel = GuiLabel.short;
