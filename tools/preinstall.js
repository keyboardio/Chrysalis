const package = require("../package.json");
const fs = require("fs");

if (process.env.GITHUB_REF && process.env.GITHUB_REF.indexOf("refs/pull/") != -1) {
  const prNumber = process.env.GITHUB_REF.match(/^refs\/pull\/(\d+)\//)[1];
  const buildNumber = process.env.GITHUB_RUN_NUMBER;
  const newVersion = package
        .version
        .replace(/-.*/, "")
        + `-pr-${prNumber}.${buildNumber}`;
  package.version = newVersion;
  package.build.artifactName = "${productName}-pr-" + prNumber + ".${ext}";
  console.log("package.version =", package.version);

  fs.writeFileSync("./package.json", JSON.stringify(package, null, 2));
} else if (process.env.GITHUB_RUN_NUMBER &&
    package.version.indexOf("-snapshot") != -1 &&
    package.version.indexOf("-snapshot.") == -1) {
  package.version = package.version + "." + process.env.GITHUB_RUN_NUMBER;
  package.build.artifactName = "${productName}-" + package.version + ".${ext}";
  console.log("package.version =", package.version);

  fs.writeFileSync("./package.json", JSON.stringify(package, null, 2));
}
