var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var unmethodSchema = new Schema ({
  title: String,
  oldtitle: [String],
  name: String,
  stage: { type: Number, min: 3, max: 33, required: true },
  classification: {
    little: Boolean,
    differential: Boolean,
    plain: Boolean,
    trebleDodging: Boolean
  },
  class: { type: String, enum: ['Bob', 'Place', 'Slow Course', 'Treble Bob', 'Treble Place', 'Delight', 'Surprise', 'Alliance', 'Hybrid', 'Differential', 'Principle', 'Unclassified'] },
  pn: String,
  pnFull: [],
  calls: [{ type: Schema.Types.ObjectId, ref: 'call' }],
  notes: String
});



module.exports = mongoose.model('unmethod', unmethodSchema);