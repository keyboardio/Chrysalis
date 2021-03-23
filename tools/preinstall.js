const package = require("../package.json");
const fs = require("fs");

if (process.env.GITHUB_RUN_NUMBER &&
    package.version.indexOf("-snapshot") != -1 &&
    package.version.indexOf("-snapshot.") == -1) {
  package.version = package.version + "." + process.env.GITHUB_RUN_NUMBER;
  package.build.artifactName = "${productName}-" + package.version + ".${ext}";
  console.log("package.version = ", package.version);
}

fs.writeFileSync("./package.json", JSON.stringify(package, null, 2));
