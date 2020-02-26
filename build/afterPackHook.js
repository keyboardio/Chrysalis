const path = require('path');
const fs = require('fs');
const util = require('util');

const renameAsync = util.promisify(fs.rename);
const unlinkAsync = util.promisify(fs.unlink);

module.exports = async function(context) {
  // Replace the app launcher on linux only.
  if (process.platform !== 'linux') {
    return;
  }

  const executableName = context.packager.executableName;
  const sourceExecutable = path.join(context.appOutDir, executableName);
  const targetExecutable = path.join(context.appOutDir, `${executableName}-bin`);
  const launcherScript = path.join(
    context.appOutDir,
    'resources',
    'launcher.sh'
  );
  const chromeSandbox = path.join(context.appOutDir, 'chrome-sandbox');

  return Promise.all([
    // rename bazecor to bazecor-bin
    renameAsync(sourceExecutable, targetExecutable),

    // rename launcher script to bazecor
    renameAsync(launcherScript, sourceExecutable),

    // remove the chrome-sandbox file since we explicitly disable it
    unlinkAsync(chromeSandbox)
  ]);
};
