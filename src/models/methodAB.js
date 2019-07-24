var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var methodABschema = new Schema({
  loc: {type: String, enum: ["above", "below"]},
  placeNotation: [String],
  methods: [String]
});

module.exports = mongoose.model('methodAB', methodABschema);