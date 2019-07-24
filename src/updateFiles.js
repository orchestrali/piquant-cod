const request = require('request');
const decompress = require('decompress');
const fs = require('fs');
const rimraf = require('rimraf');
const xmlToJson = require('xml-to-json-stream');
const stream = xmlToJson().createStream();
const logger = require('./logger.js');

var url = 'https://cccbr.github.io/methods-library/xml/CCCBR_methods.xml.zip';

module.exports = function updateFiles(cb) {
	rimraf.sync("work");
  fs.mkdirSync("work");
  
  request(url)
    .pipe(fs.createWriteStream('work/download.zip'))
    .on('close', function () {
      logger.info('File written! apparently');
    
      decompress("work/download.zip", "work").then(files => {
        logger.info('file decompressed! length: ' + files.length);
        
        logger.info('piping stream');
				let input = fs.createReadStream('work/CCCBR_methods.xml');
				let output = fs.createWriteStream('work/collection.json');
			  
			  input.pipe(stream).pipe(output).on('finish', function () {
			  	logger.info('stream piped');
			  	cb();
			  });
        
      });
    });

}