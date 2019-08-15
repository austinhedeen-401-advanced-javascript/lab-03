'use strict';

const faker = require('faker');

const utils = module.exports = {};

// Convert the file content to JSON
utils.convertToJSON = content => {
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error: Invalid JSON object in file`);
    process.exit(1);
  }
};

// Modify the JSON content
utils.modifyJSON = jsonContent => {
  jsonContent.firstName = faker.name.firstName();
  jsonContent.lastName = faker.name.lastName();
  jsonContent.hair.type = faker.hacker.adjective();
  jsonContent.hair.color = faker.commerce.color();
  jsonContent.married = faker.random.boolean();
  jsonContent.kids = faker.random.number();
  return jsonContent;
};

// Compares given file content to the expected JSON object
utils.verifyFileJSON = (fileContent, expectedJSON) => {
  if (fileContent.toString() === JSON.stringify(expectedJSON)) {
    console.log(`File matches expected JSON!`);
  } else {
    console.log(`Oops, file doesn't match the expected data!`);
  }
};
