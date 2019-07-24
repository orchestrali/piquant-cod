const request = require('request');

module.exports = function updateApps(cb) {
  request('https://instinctive-metal.glitch.me/updatenames'+process.env.SECRET2, function (err, res, body) {
    if (err) console.log(err);
    request('https://changeringing.glitch.me/updatenames'+process.env.SECRET2, function (err, res, body) {
      if (err) console.log(err);
      cb();
    })
  })
  
}