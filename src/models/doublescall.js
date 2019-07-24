var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var callschema = new Schema({
  names: [String],
  code: String,
  callLoc: Number,
  pn: [],
});


module.exports = mongoose.model('doublescall', callschema);