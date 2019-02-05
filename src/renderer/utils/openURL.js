import Electron from "electron";

export default function openURL(url) {
  const shell = Electron.remote && Electron.remote.shell;

  if (!shell) return;
  return () => {
    shell.openExternal(url);
  };
}
