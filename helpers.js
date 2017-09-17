var fs = require('fs'),
    path = require('path'),
    request = require('request'),
    helpers = require(__dirname + '/helpers.js');


module.exports = {
  random_from_array: function(arr) {
    return arr[Math.floor(Math.random()*arr.length)]; 
  },
  get_random_int: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  get_random_hex: function() {
    return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
  },
  shade_color: function(color, percent) {
    // https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
      var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
      return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  },
  extension_check: function(url) {
  /* Check if file has a known image extension, courtesy of revdancatt. */
      var extName = path.extname(url).toLowerCase();
      return extName === ".png" || extName === ".jpg" || extName === ".jpeg";
  },
  upload_random_image_remote: function(urls, cb) {
    console.log('loading remote image...');

    request({url: helpers.random_from_array(urls), encoding: null}, function (err, res, body) {
        if (!err && res.statusCode == 200) {
          var b64content = 'data:' + res.headers['content-type'] + ';base64,';
          
              console.log('Image loaded!');
              cb(body.toString('base64'));           
        } else {
            console.log('ERROR:');
            console.log(err);
            // response.sendStatus(500);
        }
    });
  },  
};
