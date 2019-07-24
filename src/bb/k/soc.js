

module.exports = function assoc(arr) {
  if (arr.length > 1) {
    console.log("more than one association object???")
  }
  let text = (arr.length > 0 && arr[0].text) ? arr[0].text : "";
  
  return {association: text};
}