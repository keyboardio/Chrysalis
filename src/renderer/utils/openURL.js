import Electron from "electron";

export default function openURL(url) {
  return () => {
    Electron.shell.openExternal(url);
  };
}
