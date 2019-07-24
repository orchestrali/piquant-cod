var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var callschema = new Schema({
  stage: Number,
  name: String,
  symbol: String,
  callLoc: Number,
  pn: [],
  methods: [String],
  description: String
});


module.exports = mongoose.model('call', callschema);