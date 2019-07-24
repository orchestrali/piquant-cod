const urls = ["memoria", "event"]

module.exports = function event(arr) {
  if (arr.length > 1) {
    console.log("more than one event");
  }
  let events = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].content) {
      for (let j = 0; j < arr[i].content.length; j++) {
        let e = arr[i].content[j];
        if (e.attributes && e.attributes.href && urls.find(u => e.attributes.href.startsWith(u))) {
          events.push({
            url: "https://bb.ringingworld.co.uk/" + e.attributes.href,
            name: e.text[0]
          });
        }
      }
    }
    
  }
  
  return {events: events};
}