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

  return Promise.all([
    // rename chrysalis to chrysalis-bin
    renameAsync(sourceExecutable, targetExecutable),

    // rename launcher script to chrysalis
    renameAsync(launcherScript, sourceExecutable)
  ]);
};
