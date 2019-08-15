'use strict';

const fs = require('fs');
const faker = require('faker');

const jsonUtils = require('./json-utils');

const editFile = fileName => {
  // Read the content of of the specified file
  fs.readFile(fileName, (error, fileContent) => {
    if (error) {
      console.error(`Error: File '${fileName}' does not exist`);
      process.exit(1);
    }
    const jsonContent = jsonUtils.convertToJSON(fileContent.toString());
    const modifiedContent = jsonUtils.modifyJSON(jsonContent);

    fs.writeFile(fileName, JSON.stringify(modifiedContent), error => {
      if (error) {
        console.error(`Error writing to file '${fileName}'`);
        process.exit(1);
      }

      fs.readFile(fileName, (error, fileContent) => {
        if (error) {
          console.error(`Error: File '${fileName}' does not exist`);
          process.exit(1);
        }

        jsonUtils.verifyFileJSON(fileContent, modifiedContent);
      });
    });
  });
};

// CLI entry
if (process.argv.length >= 3) {
  console.log('Executing via CLI:');
  editFile(process.argv[2]);
} else if (process.argv[1].endsWith(__filename)) {
  console.error(`Error: Required argument 'filename'`);
  process.exit(1);
}

// Module entry
module.exports = editFile;
