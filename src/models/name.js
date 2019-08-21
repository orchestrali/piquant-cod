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
});

nameSchema
.virtual('total')
.get(function () {
  let num = 0;
  this.classes.forEach(cl => {
    num += cl.stages.length
  });
  return num;
});

module.exports = mongoose.model("name", nameSchema);