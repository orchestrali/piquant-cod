var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordschema = new Schema({
  word: String,
  beginning: Number,
  middle: Number,
  methods: Number,
  method: Boolean,
  unmethod: Boolean,
  variation: Boolean
});


module.exports = mongoose.model('word', wordschema);