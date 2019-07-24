//each object in the names array needs to have a name

module.exports = function unique(names) {
  console.log("adding uniques");
  let unname = names.find(o => !o.name);
  //if (unname) console.log(unname);
  for (let i = 0; i < names.length; i++) {
    let words = names[i].name.split(" ");
    let last;
    if (words.length > 1 && isNaN(names[i].name[0])) {
      while (names.filter(n => n.name.startsWith(words.join(" "))).length === 1) {
        last = words.pop();
        //if (i < 10) console.log(last);
      }
      words.push(last);
      let u = words.join(" ").trim();
      if (u.endsWith("'s")) {
        let test = u.slice(0, -2);
        if (names.filter(n => n.name.startsWith(test)).length === 1) {
          names[i].unique = test;
        }
      } else if (u != names[i].name) {
        names[i].unique = u;
      } else {
        delete names[i].unique;
      }

    }
    
  }
  
  return;
}