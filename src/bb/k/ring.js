

module.exports = function ringers(arr) {
  if (arr.length > 1) {
    console.log("more than one ringers div");
  }
  let people = [];
  let bell;
  let hand = false;
  for (let i = 0; i < arr[0].content.length; i++) {
    let person = {};
    for (let j = 0; j < arr[0].content[i].content.length; j++) {
      let e = arr[0].content[i].content[j];
      if (e.attributes && e.attributes.class && e.text) {
        if (e.attributes.class === "bell") {
          person.bell = e.text[0];
          bell = e.text[0];
          if (e.text[0].includes("–")) hand = true;
        } else if (e.attributes.class === "ringer persona") {
          person.name = e.text[0];
        }
        
      }
    }
    if (arr[0].content[i].text && arr[0].content[i].text[0].toLowerCase().includes("(c)")) {
      person.conductor = true;
    }
    if (!arr[0].content[i].content.find(o => o.attributes.class === "bell")) {
      person.bell = bell;
    }
    people.push(person);
  }
  let numbells = Number(bell.slice(bell.lastIndexOf("–")+1));
  
  return {ringers: people, bells: hand ? "hand" : "tower", numbells: numbells};
}