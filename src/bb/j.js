const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

module.exports = function buildObj(elems) {
  
  //association is easy
  //handle location - address + full-place
  //handle date-time-tenor
  //handle title including changes
  //handle details - need title for this
  //handle attribution
  //handle ringers
  //handle footnotes
  //handle event
  let prelim = {
    association: [],
    location: {fullPlace: [], address: []},
    dateTimeTenor: [],
    pealSpeed: "",
    title: {},
    details: [],
    attribution: [],
    ringers: [],
    footnote: [],
    event: [],
    discard: []
  };
  var classes = [{class: "full-place", key: "location", subkey: "fullPlace"}, {class: "address", key: "location", subkey: "address"}, {class: "linked-events", key: "event"}];
  let used = [];
  
  for (let i = 0; i < elems.length; i++) {
    if (elems[i].attributes) {
      let c = elems[i].attributes.class
      if (c) {
        let key = Object.keys(prelim).find(k => c.indexOf(k) > -1);
        if (key) {
          prelim[key].push(elems[i]);
          used.push(i);
        } else {
          let cl = classes.find(o => c.indexOf(o.class) > -1);
          if (cl) {
            if (cl.subkey) {
              prelim[cl.key][cl.subkey].push(elems[i]);
              used.push(i);
            } else {
              prelim[cl.key].push(elems[i]);
              used.push(i);
            }
          }
        }
        
      } else if (elems[i].attributes.title) {
        if (elems[i].attributes.title.indexOf("Peal speed") > -1) {
          prelim.dateTimeTenor.push(elems[i]);
          prelim.pealSpeed = elems[i].attributes.title;
          used.push(i);
        }
      }
      
      
    } else {
      if (elems[i].text && days.some(d => elems[i].text[0].indexOf(d) > -1)) {
        prelim.dateTimeTenor.push(elems[i]);
        used.push(i);
      } else if (elems[i].content) {
        let elem = elems[i].content.find(o => o.attributes);
        if (elem && (elem.attributes.class === "changes" || elem.attributes.class === "title")) {
          prelim.title = elems[i];
          used.push(i);
        }
        if (elem && (elem.attributes.class === "composer persona" || (elem.attributes.href && elem.attributes.href.includes("comp")))) {
          prelim.attribution.push(elems[i]);
          used.push(i);
        }
      }
      
    }
    
    if (!used.includes(i)) {
      prelim.discard.push(elems[i]);
    }
    
    
  }
  
  return prelim;
}