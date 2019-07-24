const fs = require('fs');
const xmlToJson = require('xml-to-json-stream');
const stream = xmlToJson().createStream();
const logger = require('./logger.js');

//given xml convert it to JSON and return an array of methodSets with stage at 12 max
module.exports = function parseXML(cb) {
  
  //let data = convert.xml2json(xml, {compact: true, spaces: 4});
  //let collection = JSON.parse(data).collection.methodSet.filter(o => Number(o.properties.stage._text) < 13)
  let input = fs.createReadStream('work/CCCBR_methods.xml');
  let output = fs.createWriteStream('work/collection.json');

  input.pipe(stream).pipe(output).on('finish', function () {
    logger.info('stream piped');
    cb();
  });
  
  
  
}