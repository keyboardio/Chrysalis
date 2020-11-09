#! /usr/bin/env node

const AWS = require("aws-sdk");
const package = require("../package.json");
const fs = require("fs");

const extensions = {
  linux: "AppImage",
  osx: "dmg",
  windows: "exe"
};
const sourceFileName =
      "Chrysalis-" +
      package.version +
      "." +
      extensions[process.env['TRAVIS_OS_NAME']];
const destFileName =
      "Chrysalis-" +
      package.version +
      "." +
      (process.env["TRAVIS_OS_NAME"] == "linux" ? process.env["TRAVIS_CPU_ARCH"] + "." : "") +
      extensions[process.env['TRAVIS_OS_NAME']];
const destLatestFileName =
      "Chrysalis." +
      (process.env["TRAVIS_OS_NAME"] == "linux" ? process.env["TRAVIS_CPU_ARCH"] + "." : "") +
      extensions[process.env['TRAVIS_OS_NAME']];

console.log("Connecting to AWS...");

const s3 = new AWS.S3({
  accessKeyId: process.env['ARTIFACTS_KEY'],
  secretAccessKey: process.env['ARTIFACTS_SECRET']
});

console.log("Uploading", destFileName, "...");

let fileStream = fs.createReadStream("dist/" + sourceFileName);

let destPath = "Chrysalis/";
if (process.env['TRAVIS_PULL_REQUEST'] == "false") {
    destPath = destPath + process.env['TRAVIS_BRANCH'] + "/";
}

fileStream.on("open", () => {
  s3.upload({
    Bucket: process.env['ARTIFACTS_BUCKET'],
    Key: destPath + process.env['TRAVIS_BUILD_NUMBER'] + "/" + destFileName,
    Body: fileStream,
    ACL: process.env['ARTIFACTS_PERMISSIONS']
  }, (error, data) => {
    if (error) {
      throw error;
    }
    if (data) {
      s3.putObject({
        Bucket: process.env['ARTIFACTS_BUCKET'],
        Key: destPath + "latest/" + destLatestFileName,
        WebsiteRedirectLocation: data.Location
      }, error => {
        if (error)
          throw error;
      });
      console.log("  ", data.Location)
    }
  });
  s3.upload({
    Bucket: process.env['ARTIFACTS_BUCKET'],
    Key: destPath + process.env['TRAVIS_BUILD_NUMBER'] + "/version.txt",
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
