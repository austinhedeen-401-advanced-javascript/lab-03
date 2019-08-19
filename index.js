'use strict';

const editFile = require('./edit-file');
const editFilePromise = require('./edit-file-promise');

const fileName = 'data/person.json';

// CLI entry
if (process.argv.length >= 3) {
  console.log('Executing via CLI:');
  editFilePromise(process.argv[2]);
} else if (process.argv[1].endsWith(__filename)) {
  console.error(`Error: Required argument 'filename'`);
  process.exit(1);
}
