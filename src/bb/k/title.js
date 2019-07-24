const keys = ["changes", "title", "titleExtra"];

module.exports = function title(obj) {
  let results = {};
  
  for (let i = 0; i < obj.content.length; i++) {
    if (obj.content[i].attributes) {
      if (obj.content[i].attributes.class === "changes" && obj.content[i].text) {
        results.changes = Number(obj.content[i].text[0]);
      } else if (obj.content[i].attributes.class === "title" && obj.content[i].text) {
        results.title = obj.content[i].text[0];
      }
    }
  }
  if (obj.text) {
    results.titleExtra = obj.text[0].trim();
  }
  let titleFull = [];
  for (let i = 0; i < keys.length; i++) {
    if (results[keys[i]]) {
      titleFull.push(results[keys[i]]);
    }
  }
  results.titleFull = titleFull.join(" ").replace(/  +/g, " ");
  return results; 
}