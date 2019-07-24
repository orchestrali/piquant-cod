var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cycleschema = new Schema({
  stage: Number,
  cycle: [String],
  numHunts: Number,
  hunts: [Number],
  differential: Boolean,
  shortcourse: Boolean,
  plainbob: Boolean,
  grandsire: Boolean
});

module.exports = mongoose.model('cycle', cycleschema);