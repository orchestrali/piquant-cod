const classes = ["Surprise", "Bob", "Place", "Treble Bob", "Treble Place", "Delight", "Alliance", "Hybrid", "Differential", "Principle"];

module.exports = function build(arr, things) {
  for (let j = 0; j < arr.length; j++) {
    //if (arr[j].name === "Adzor") console.log(arr[j]);
    let c = [];
    if (arr[j].classification.differential && arr[j].class != "Differential") c.push("Differential");
    if (arr[j].classification.little) c.push("Little");
    c.push(arr[j].class);
    let d = arr[j].title.slice(0, arr[j].title.lastIndexOf(" ")).replace(arr[j].name, "").trim();
    let key = arr[j].old ? "prevClasses" : "classes";
    let name = things.names.find(o => o.name === arr[j].name);
    if (name) {
      if (name[key]) {
        let o = name[key].find(e => e.descriptor === c.join(" ") && e.title === d);
        if (o) {
          if (!o.stages.includes(arr[j].stage)) o.stages.push(arr[j].stage);
        } else {
          name[key].push({
            descriptor: c.join(" "),
            title: d,
            stages: [arr[j].stage]
          });
        }
      } else {
        name[key] = [{
          descriptor: c.join(" "),
          title: d,
          stages: [arr[j].stage]
        }];
      }
      
    } else {
      let n = {
        name: arr[j].name
      }
      n[key] = [{
        descriptor: c.join(" "),
        title: d,
        stages: [arr[j].stage]
      }];
      things.names.push(n);
    }
    
    if (!arr[j].old) {
      for (let k = 0; k < arr[j].oldtitle.length; k++) {
        //if (arr[j].name === "Adzor") console.log("Adzor oldtitle");
        let t = arr[j].oldtitle[k];
        let n = {classification: {}, stage: arr[j].stage, title: t, old: true};
        let words = t.split(" ");
        //if (arr[j].name === "Adzor") console.log(words);
        if (words[words.length-3] === "Treble" && (words[words.length-2] === "Bob" || words[words.length-2] === "Place")) {
          n.class = "Treble " + words[words.length-2];
          words.splice(words.length-3, 3);
        } else if (words[words.length-3] === "Slow" && words[words.length-2] === "Course") {
          n.class = "Slow Course";
          words.splice(words.length-3, 3);
        } else if (classes.includes(words[words.length-2])) {
          n.class = words[words.length-2];
          words.splice(words.length-2, 2);
        }
        if (words[words.length-1] === "Little") {
          n.classification.little = true;
          words.splice(words.length-1, 1);
        }
        if (words[words.length-1] === "Differential") {
          n.classification.differential = true;
          words.splice(words.length-1, 1);
        }
        n.name = words.join(" ");
        //if (arr[j].name === "Adzor") console.log(n);
        things.oldtitles.push(n);
      }

    }
    

  }
  
}