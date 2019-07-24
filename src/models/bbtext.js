var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bbtextschema = new Schema({
  num: Number,
  body: String
});

module.exports = mongoose.model('bbtext', bbtextschema);