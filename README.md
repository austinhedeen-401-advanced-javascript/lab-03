# Lab 03 - Async
#### *Author: Austin Hedeen*

Reads, modifies, and writes data to and from a file on the system using
asynchronous programming techniques.

### Modules

#### `edit-file.js`
Reads content and writes modified content back to a data file using asynchronous callbacks.

#### `edit-file-promise.js`
Reads content and writes modified content back to a data file using promises.

#### `json-utils.js`
Utility functions for handling JSON objects.

### Dependencies
* jest
* faker

## Usage

### CLI entry
`$ node edit-file.js {path/to/data/file}`  
`$ node edit-file-promise.js {path/to/data/file}`

### Module entry
`$ node index.js` or `$ npm run start`

### Code behavior
0. (CLI) Verifies the presence of a command line argument
0. Reads file, exits on error
0. Converts file content into JSON, exits on malformed JSON object  
0. Modifies JSON object
0. Writes modified JSON back to file, exits on error
0. Reads file again, exits on error
0. Verifies file contents match modified JSON
