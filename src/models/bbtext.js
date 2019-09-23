var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bbtextschema = new Schema({
  bbNum: Number, //{type: Number, unique: true},
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
  title: String,
  titleExtra: String,
  details: String,
  compUrl: String,
  attribution: String,
  ringers: [{
    bell: String,
    name: String,
    conductor: Boolean
  }],
  bells: String,
  footnote: String,
  recordlength: Boolean,
  events: [{
    url: String,
    name: String
  }],
  methods: [String],
  variations: [String]
});

module.exports = mongoose.model('bbtext', bbtextschema);