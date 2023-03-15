const package = require("../package.json");
const fs = require("fs");
const YAML = require("yaml");
var crypto = require("crypto");
const { argv } = require('node:process');


const product = "Chrysalis";
let output_file = "";
let files = [];

let version = argv[2];

if (version === undefined) {
    version = package.version
}

if (process.platform === "darwin") {
  output_file = "latest-mac.yml";
  files = [
     `${product}-${process.platform}-universal-${version}.zip` ,
     `${product}-${version}-universal.dmg` ,
  ];
} else if (process.platform === "win32") {
  output_file = "latest.yml";
  files = [
    `${product}-${process.platform}-x64-${version}.zip` ,
  ];
} else if (process.platform == "linux") {
  output_file = "latest-linux.yml";
  files = [
    `${product}-${version}-x64.AppImage` ,
  ];
}

const getFileSHA512 = (file) => {
    console.log("Reading file " + file);
  const fileBuffer = fs.readFileSync(file);
  const base64 = crypto
    .createHash("sha512")
    .update(fileBuffer)
    .digest("base64");
  return base64;
};

const getFileSize = (file) => {
  var stats = fs.statSync(file);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

const event = new Date();

let data = {
  version: package.version,
  files: [],
  path: files.at(0),
  sha512: getFileSHA512(files.at(0)),
  releaseDate: event.toISOString(),
};

files.forEach((file) => {
  data.files.push({
    url: file,
    size: getFileSize(file),
    sha512: getFileSHA512(file),
  });
});

fs.writeFileSync(output_file, YAML.stringify(data));
