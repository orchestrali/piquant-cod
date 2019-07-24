

module.exports = function tokenize(str) {
  var tokens = [];
  return t(str);
  
  function t(str) {
    let newstart;
    if (str.substring(0, 2) === "</") {
      newstart = str.indexOf(">") > -1 ? str.indexOf(">")+1 : str.length+1;
      let token = {
        type: "closing tag",
        value: str.substring(2, newstart-1)
      }
      tokens.push(token);

    } else if (str[0] === "<") {
      newstart = str.indexOf(">") > -1 ? str.indexOf(">")+1 : str.length+1;
      tokens.push({
        type: "opening tag",
        value: str.substring(1, newstart-1)
      });
    } else {
      newstart = str.indexOf("<") > -1 ? str.indexOf("<") : str.length;
      tokens.push({
        type: "contents",
        value: str.substring(0, newstart)
      });
    }
    let next = str.substring(newstart);
    if (next.length > 1) {
      return t(next);
    } else {
      //console.log("tokens complete");
      return tokens.filter(o => o.value != " ");
    }
    
  }
  
  
}