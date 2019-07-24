

module.exports = function footnote(arr) {
  let notes = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].fulltext) {
      notes.push(arr[i].fulltext);
    }
  }
  
  return {footnote: notes.join("\n")};
}