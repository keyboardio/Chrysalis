const package = require("../package.json");
const fs = require("fs");

if (process.env.TRAVIS &&
    process.env.TRAVIS_TAG == "" &&
    package.version.indexOf("+") == -1) {
  package.version = package.version + "+" + process.env.TRAVIS_BUILD_NUMBER;
  package.build.artifactName = "${productName}-" + package.version + ".${ext}";
  console.log("package.version = ", package.version);
}

fs.writeFileSync("./package.json", JSON.stringify(package, null, 2));
