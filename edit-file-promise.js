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

// CLI entry
if (process.argv.length >= 3) {
  console.log('Executing via CLI:');
  editFilePromise(process.argv[2]);
} else if (process.argv[1].endsWith(__filename)) {
  console.error(`Error: Required argument 'filename'`);
  process.exit(1);
}

// Module entry
module.exports = editFilePromise;
