

module.exports = function titlecheck(title, methods, info, stuff) {
  
  let m = methods.find(o => o.title.toLowerCase() === title || (o.oldtitle && o.oldtitle.some(t => t.toLowerCase() === title)));
  if (m) {
    
  }
  
}