

module.exports = function pairs(tokens) {
  
  let openings = [], closings = [];

  tokens.forEach((o, i) => {
    if (o.type === "opening tag") openings.push(i);
    if (o.type === "closing tag") closings.push(i);
  });
  
  let pairs = [];

  while (openings.length > 0) {
    let current = openings.pop();
    let closeIndex = closings.findIndex(n => n > current);
    pairs.push({
      openIndex: current,
      closeIndex: closings[closeIndex]
    });
    closings.splice(closeIndex, 1);
  }
  
  pairs.reverse();
  return pairs;
}