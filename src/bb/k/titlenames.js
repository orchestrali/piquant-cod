const nametests = [{trigger: /^St /, subs: ["st.", "st. "]}, {trigger: /'s/, subs: ["", "s"]}, {trigger: /s'/, subs: ["s", "'s"]}, {trigger: / St /, subs: [" st.", " st. "]}, {trigger: /^Reverse /, subs: ["Rev ", "Rev.", "Rev. ", "Rev' "]}, {trigger: /^No\. /, subs: ["No.", "No ", "#"]}, {trigger: / No\./, subs: [" No. ", " No ", " #"]}];

module.exports = function titlenames(name, names) {
  let num = nametests.findIndex(nt => nt.trigger.test(name));
  if (num > -1) {
    recursive(num);
  }
  
  function recursive(i) {
    let level = [];
    names.forEach(n => {
      nametests[i].subs.forEach(s => {
        level.push(n.replace(nametests[i].trigger, s))
      });
    });
    level.forEach(n => {
      if (!names.includes(n)) {
        names.push(n);
      }
    });
    if (i < nametests.length-1) {
      let j = nametests.findIndex((nt, ind) => nt.trigger.test(name) && ind > i);
      if (j > -1) {
        recursive(j);
      }
    }
  }
  return names;
}