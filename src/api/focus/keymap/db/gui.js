const GuiLabels = {
  linux: { full: "Super", "1u": "Sup.", short: "Su" },
  win32: { full: "Windows", "1u": "Win", short: "W" },
  darwin: { full: "Command", "1u": "Cmd", short: "Cm" },
  default: { full: "Gui", "1u": "Gui", short: "G" },
};
export const GuiLabel = GuiLabels.default; // TODO: GuiLabels[process.platform] || GuiLabels.default;

export const GuiShortLabel = GuiLabel.short;
