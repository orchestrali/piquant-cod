

module.exports = function attribution(arr) {
  if (arr.length > 1) console.log("more than one attribution element");
  let results = {};
  let composers = [];
  let full = [];
  for (let j = 0; j < arr.length; j++) {
    if (arr[j].content) {
      for (let i = 0; i < arr[j].content.length; i++) {
        let e = arr[j].content[i];
        if (e.attributes) {
          if (e.attributes.class && e.attributes.class === "composer persona" && e.text) {
            composers.push(e.text[0]);
          }
          if (e.attributes.href && e.attributes.href.startsWith("comp.php")) {
            results.compUrl = "https://bb.ringingworld.co.uk/" + e.attributes.href;
          }

        }

      }

    }
    if (arr[j].fulltext && arr[j].fulltext.length > 0 && arr[j].fulltext != "View composition") {
      full.push(arr[j].fulltext);
    }
  }
  if (composers.length > 0) {
    results.composers = composers;
  }
  if (full.length > 0) {
    results.attribution = full.join(". ") + ".";
  }
  return results;
}