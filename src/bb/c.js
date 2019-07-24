

module.exports = function trim(str) {
  let startindex = str.indexOf('<div class="performance">');
  let endindex = str.indexOf('<div class="paragraphs section">');
  let performance = "";
  if (startindex > -1 && endindex > -1 && endindex > startindex+25) {
    performance = str.substring(startindex+25, endindex);
    let event = str.indexOf('<p class="linked-events');
    if (event > -1) {
      performance += str.substring(event, str.indexOf("</p>", event)+4);
    }
    performance = performance.replace(/\n/g, " ").replace(/  +/g, " ").replace(/&amp;/g, "&").replace(/&ndash;/g, "–").replace(/&mdash;/g, "—");
  }
  return performance;
}