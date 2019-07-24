var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var varschema = new Schema({
  name: String,
  title: String,
  stage: Number,
  altnames: [String],
  method: { id: { type: Schema.Types.ObjectId, ref: 'method' }, title: String },
  unmethod: { id: { type: Schema.Types.ObjectId, ref: 'unmethod' }, title: String },
  calls: [{ type: Schema.Types.ObjectId, ref: 'doublescall' }],
});


module.exports = mongoose.model('variation', varschema);