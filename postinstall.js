var fs = require('fs');
var assets = require('./assets.js');

assets.files.forEach(function(file_metadata){

    fs.createReadStream(file_metadata.file)
    .pipe(fs.createWriteStream(file_metadata.path));

});

