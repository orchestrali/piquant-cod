var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leadheadschema = new Schema({
  stage: Number,
  leadhead: String,
  lhpn: [],
  pn1: [],
  plainbob: Boolean,
  grandsire: Boolean,
  code: String
});

module.exports = mongoose.model('leadhead', leadheadschema);