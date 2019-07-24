

module.exports = function nextLevels(elements, pairs) {
  
  for (let i = 0; i < elements.length; i++) {
    let open = elements[i].openIndex, close = elements[i].closeIndex;
    let n = pairs.findIndex(o => o.openIndex > open && o.closeIndex < close);
    if (n > -1) {
      elements[i].content = [];
      do {
        elements[i].content.push(pairs[n]);
        n = pairs.findIndex(o => o.openIndex > pairs[n].closeIndex && o.closeIndex < close);
      } while (n > -1);
      nextLevels(elements[i].content, pairs);
    }
    
  }
  
}