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

module.exports = editFile;
