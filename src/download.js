const request = require('request');
const decompress = require('decompress');
const fs = require('fs');
const rimraf = require('rimraf');
const logger = require('./logger.js');

var url = 'https://cccbr.github.io/methods-library/xml/CCCBR_methods.xml.zip';

module.exports = function download(cb) {
  rimraf.sync("work");
  fs.mkdirSync("work");
  
  request(url)
    .pipe(fs.createWriteStream('work/download.zip'))
    .on('close', function () {
      logger.info('File written! apparently');
    
      decompress("work/download.zip", "work").then(files => {
        logger.info('done! length: ' + files.length);
        
        cb();
        
      });
    });
  
}