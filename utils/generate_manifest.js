const manifest = require('../manifest.json');
const fileSystem = require('fs');
const path = require('path');

// generates the manifest file using the package.json informations
manifest.version = process.env.npm_package_version;
manifest.background.scripts = ['/webpack/background.bundle.js'];
manifest.content_scripts[0].js.push('/webpack/content.bundle.js');


let folder = '../build';
// if (process.env.NODE_ENV !== 'dev') {
//     folder = '../dist';
// }
fileSystem.writeFileSync(
    path.join(__dirname, `${folder}/manifest.json`),
    JSON.stringify(manifest, 0, 2)
);
