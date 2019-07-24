const request = require('request');

const url = "https://bb.ringingworld.co.uk/view.php?id="

module.exports = function get(num, cb) {
  request(url+num, function (err, res, body) {
    if (err) console.log(err);
    if (body) {
      cb(body);
    } else {
      cb([]);
    }
    
  });
  
}