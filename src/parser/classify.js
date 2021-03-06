const classes = ['Bob', 'Place', 'Slow Course', 'Treble Bob', 'Treble Place', 'Delight', 'Surprise', 'Alliance', 'Hybrid', 'Differential', 'Principle']

module.exports = function classify(input, props) {
  if (classes.indexOf(input) > -1) return input;
  if (input.textNode) return input.textNode;
  if (input.differential) return "Differential";
  /*
  if (props) {
    for (var i = 0; i < classes.length; i++) {
      if (props.toLowerCase().indexOf(classes[i].toLowerCase()) > -1) {
        return classes[i];
      }
    }
  }
  */
  return "Principle";
};