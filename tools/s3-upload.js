#! /usr/bin/env node

const AWS = require("aws-sdk");
const package = require("../package.json");
const fs = require("fs");

const extensions = {
  linux: "AppImage",
  osx: "dmg",
  windows: "exe"
};
const fileName =
      "Chrysalis-" +
      package.version +
      "." +
      extensions[process.env['TRAVIS_OS_NAME']];

console.log("Connecting to AWS...");

const s3 = new AWS.S3({
  accessKeyId: process.env['ARTIFACTS_KEY'],
  secretAccessKey: process.env['ARTIFACTS_SECRET']
});

console.log("Uploading", fileName, "...");

let fileStream = fs.createReadStream("dist/" + fileName);

fileStream.on("open", () => {
  s3.upload({
    Bucket: process.env['ARTIFACTS_BUCKET'],
    Key: "Chrysalis/" + process.env['TRAVIS_BUILD_NUMBER'] + "/" + fileName,
    Body: fileStream,
    ACL: process.env['ARTIFACTS_PERMISSIONS']
  }, (error, data) => {
    if (error) {
      throw error;
    }
    if (data) {
      console.log("  ", data.Location)
    }
  });
  s3.upload({
    Bucket: process.env['ARTIFACTS_BUCKET'],
    Key: "Chrysalis/" + process.env['TRAVIS_BUILD_NUMBER'] + "/version.txt",
    Body: Buffer.from(package.version),
    ACL: 'public-read'
  }, (error, data) => {
    if (error) {
      throw error;
    }
    if (data) {
      console.log("  ", data.Location);
    }
  });
});
