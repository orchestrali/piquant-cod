

module.exports = function location(obj) {
  let loc = {};
  let search = obj.fullPlace[0].content.find(o => o.element === "a" && o.text);
  let region = search ? search.text : obj.fullPlace[0].text;
  
  for (let i = 0; i < obj.fullPlace[0].content.length; i++) {
    let o = obj.fullPlace[0].content[i];
    if (o.element === "a") {
      if (o.attributes && o.attributes.href && o.attributes.href.indexOf("dove") > -1) {
        loc.doveUrl = o.attributes.href;
        
      }
      if (o.content.length > 0) {
        let place = o.content.find(s => s.attributes.class.indexOf("place") > -1);
        if (place) loc.place = place.text ? place.text.join("") : "";
      }
    } else if (o.attributes && o.attributes.class && o.attributes.class.indexOf("place") > -1) {
      loc.place = o.text ? o.text.join("") : "";
    }
  }
  if (region) {
    loc.region = region.join(" ").startsWith(", ") ? region.join(" ").substring(2) : region.join(" ");
  }
  loc.address = obj.address[0] ? obj.address[0].fulltext : "";
  
  return {location: loc};
}