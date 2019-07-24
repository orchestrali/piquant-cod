const arrange = ["arranged by", "arranged:", "arranged from", "composed by", "composed:"];
const regex = require('../../regexlocs.js')

module.exports = function details(dets, perf) {
  let names = [];
  perf.ringers.forEach(r => {
    names.push(r.name.toLowerCase());
    let name = r.name.split(" ");
    let initials = [];
    for (let i = 0; i < name.length; i++) {
      initials.push(name[i][0]);
    }
    let possible = [initials.join(" ").slice(0, -1)+name[name.length-1], initials.join(" "), initials.join(""), initials.join("."), initials.join(". ").slice(0, -1)+name[name.length-1]];
    possible.forEach(p => {
      if (!names.includes(p.toLowerCase())) names.push(p.toLowerCase());
    })
  });
  names.sort((a,b) => b.length-a.length)
  let attribs = [];
  
  for (let i = 0; i < arrange.length; i++) {
    let w = arrange[i];
    let locs = regex(dets, w);
    locs.forEach(l => {
      let after = dets.slice(l+w.length);
      let ringer = names.find(n => after.indexOf(n) > -1 && after.indexOf(n) < 3);
      let end = ringer ? ringer.length+1 : /[^\s\w]/.test(after) ? after.search(/[^\s\w]/) : after.includes(" and ") ? after.indexOf(" and ") : after.length;
      let str = dets.slice(l, end+l+w.length);
      attribs.push(str);
      dets = dets.replace(str, " ").replace(/  +/g, " ").trim();
    });
  }
  if (attribs.length > 0) perf.attribs = attribs;
  return dets;
  
  
}