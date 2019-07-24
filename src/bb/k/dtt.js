const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

module.exports = function dateTimeTen(arr) {
  if (arr.length > 1) console.log("more than one date/time/tenor obj");
  let results = {};
  let text = arr[0].text;
  if (text) {
    if (text.length > 1) console.log("more than one date/time/tenor text");
    let tokens = text[0].split(" ");
    let year, month, date, time;
    for (let i = 0; i < tokens.length; i++) {
      let day = days.find(d => tokens[i].indexOf(d) > -1);
      if (day) {
        results.day = day;
      } else if (Number(tokens[i]) > 0 && Number(tokens[i] < 32) && !year) {
        date = Number(tokens[i]) < 10 ? "0" + tokens[i] : tokens[i];
      } else if (Number(tokens[i]) > 1700 || tokens[i] === "1748/49") {
        year = tokens[i];
      } else if (months.includes(tokens[i])) {
        let index = months.indexOf(tokens[i])+1;
        month = index < 10 ? "0" + index : index ;
      } else if (tokens[i][tokens[i].length-1] === "h") {
        time = tokens[i].slice(0, -1) + ":";
      } else if (tokens[i][tokens[i].length-1] === "m" || (Number(tokens[i]) < 60 && date)) {
        let mins = tokens[i].indexOf("m") > -1 ? tokens[i].slice(0, -1) : tokens[i];
        mins = mins.length === 1 ? "0" + mins : mins;
        if (time) {
          time += mins;
        } else {
          time = "0:" + mins;
        }
      } else if (tokens[i].startsWith("(")) {
        results.tenor = tokens.slice(i).join(" ").replace(/[\(\)]/g, "");
      }
      
    }
    if (time) results.time = time;
    results.date = year + "-" + month + "-" + date;
    
    
  }
  
  return results;
}