var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nameSchema = new Schema({
  name: String,
  unique: String,
  classes: [
    {
      descriptor: String,
      title: String,
      stages: [Number]
    }
  ],
  prevClasses: [
    {
      descriptor: String,
      title: String,
      stages: [Number]
    }
  ]
})

module.exports = mongoose.model("name", nameSchema);