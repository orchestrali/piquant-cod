


module.exports = function buildwords(arr) {
  let words = [];
  
  arr.forEach(m => {
    let ww = m.name.split(" ");
    
    ww.forEach((w,i) => {
      let unique = Number(!ww.slice(0, i).includes(w));
      let prev = words.find(o => o.word === w);
      if (prev) {
        let key = i === 0 ? "beginning" : "middle";
        prev[key] += 1;
        prev.methods += unique;
        prev[m.type] = true;
      } else {
        words.push({
          word: w,
          beginning: Number(i === 0),
          middle: Number(i > 0),
          methods: unique,
          [m.type]: true
        });
      }
    });
  });
  
  return words;
}