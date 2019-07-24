const separators = [" ", ",", "/"];
const w = ["methods", "method", "principles", "principle", "variations", "variation", "m", "p", "v", "mv"];
const w2 = ["and", "with", "cover", "atw"];
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

module.exports = function titleExtra(str) {
  //console.log("parsing title extra");
  let results = {};
  let chars = str.split("");
  let tokens = [];
  for (let i = 0; i < chars.length; i++) {
    if (Number(chars[i]) >= 0) {
      tokens.push({type: "number", value: chars[i]});
    } else if (separators.includes(chars[i])) {
      tokens.push({type: "separator", value: chars[i]});
    } else if (RegExp("[a-zA-Z]").test(chars[i])) {
      tokens.push({type: "letter", value: chars[i].toLowerCase()});
    } else {
      tokens.push({type: "separator", value: chars[i]});
    }
  }
  //console.log(tokens);
  let t2 = [];
  let num = "", word = "";
  let prevtype = "unknown";
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === "number") {
      num += tokens[i].value;
    } else if (tokens[i].type === "letter") {
      word += tokens[i].value;
    } else {
      t2.push(tokens[i]);
    }
    if (tokens[i].type != "letter" && prevtype === "letter") {
        t2.push({type: "word", value: word});
        word = "";
    }
    if (tokens[i].type != "number" && prevtype === "number") {
        t2.push({type: "number", value: Number(num)});
        num = "";
    }
    prevtype = tokens[i].type;
    
  }
  //console.log(t2);
  let numwords = []
  t2.forEach(o => {
    if (o.type === "number") {
      numwords.push({num: o.value, words: []});
    } else if (o.type === "word") {
      if (numwords.length > 0) {
        numwords[numwords.length-1].words.push(o.value);
      } else {
        numwords.push({words: [o.value]});
      }
    }
  });
  //console.log(numwords);
  //console.log(typeof numwords[0].num);
  //let next = numwords.filter(o => {o.num > 0});
  //console.log(next);
  numwords.forEach(o => {
    let filtered = o.words.filter(ww => !w2.includes(ww));
    if (o.num > 0 && o.words.length > 0 && filtered.every(x => w.includes(x))) {
      let key = ""
      filtered.forEach(x => {
        if (x === "mv") key += "v";
        else key += x[0];
      });
      results[key] = o.num;
    }
    if (o.words.some(ww => !w.includes(ww) && !w2.includes(ww))) {
      results.check = true;
    }
  });
  console.log(results);
  return results;
}