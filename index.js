'use strict';

const editFile = require('./edit-file');
const editFilePromise = require('./edit-file-promise');

const fileName = 'data/person.json';

// console.log(`Executing 'edit-file.js' via module:`);
// editFile(fileName);

console.log(`Executing 'edit-file-promise.js' via module:`);
editFilePromise(fileName);
