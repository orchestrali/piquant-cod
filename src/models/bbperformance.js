var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var performanceSchema = new Schema({
  bbNum: Number,
  association: String,
  location: {
    doveUrl: String,
    place: String,
    region: String,
    address: String,
  },
  date: String,
  time: String,
  pealSpeed: String,
  tenor: String,
  changes: Number,
  titleFull: String,
  details: String,
  compUrl: String,
  composers: [String],
  ringers: [{
    bell: String,
    name: String,
    conductor: Boolean
  }],
  bells: String,
  footnote: String,
  events: [{
    url: String,
    name: String
  }],
  methods: [{type: Schema.Types.ObjectId, ref: 'method'},],
  variations: [{type: Schema.Types.ObjectId, ref: 'variation'},],
  unmethods: [{type: Schema.Types.ObjectId, ref: 'unmethod'}],
  nonMethods: [String],
});

module.exports = mongoose.model('bbperformance', performanceSchema);