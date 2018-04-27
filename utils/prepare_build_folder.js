const fileSystem = require('fs-extra');
const path = require('path');

let folder = '../build';
// if (process.env.NODE_ENV !== 'dev') {
//     folder = '../dist';
// }
fileSystem.ensureDirSync(path.join(__dirname, '../build'));
// fileSystem.ensureDirSync(path.join(__dirname, '../dist'));
// fileSystem.ensureDirSync(path.join(__dirname, '../dist_zip'));

fileSystem.emptyDirSync(path.join(__dirname, folder));

require('./generate_manifest');
