'use strict';

const fsExtra = require('fs-extra');

const jsonUtils = require('./json-utils');

// Used to verify the updated file. This variable will be modified during asynchronous events,
// but will only be accessed after being modified, due to the Promise chain.
let asyncUpdatedJSON = {};

const editFilePromise = fileName => {
  // Read the content of of the specified file
  fsExtra.readFile(fileName)
    .then(fileContent => jsonUtils.convertToJSON(fileContent.toString()))
    .then(jsonContent => jsonUtils.modifyJSON(jsonContent))
    .then(modifiedJSON => {
      asyncUpdatedJSON = modifiedJSON;
      return fsExtra.writeFile(fileName, JSON.stringify(modifiedJSON));
    })
    .then(() => fsExtra.readFile(fileName))
    .then(fileContent => jsonUtils.verifyFileJSON(fileContent, asyncUpdatedJSON))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
};

module.exports = editFilePromise;
