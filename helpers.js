var fs = require('fs'),
    path = require('path'),
    request = require('request');

module.exports = {
  random_from_array: function(arr) {
    return arr[Math.floor(Math.random()*arr.length)]; 
  },
  get_random_int: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  load_image_assets: function(cb){
    /* Load images from the assets folder */
    console.log('reading assets folder...')
    var that = this;
    fs.readFile('./.glitch-assets', 'utf8', function (err, data) {
      if (err) {
        console.log('error:', err);
        return false;
      }
      data = data.split('\n');
      var data_json = JSON.parse('[' + data.join(',').slice(0, -1) + ']'),
          deleted_images = data_json.reduce(function(filtered, data_img) {
              if (data_img.deleted) {
                 var someNewValue = { name: data_img.name, newProperty: 'Foo' }
                 filtered.push(data_img.uuid);
              }
              return filtered;
            }, []),
          img_urls = [];
      
      for (var i = 0, j = data.length; i < j; i++){
        if (data[i].length){
          var img_data = JSON.parse(data[i]),
              image_url = img_data.url;

          if (image_url && deleted_images.indexOf(img_data.uuid) === -1 && that.extension_check(image_url)){
            var file_name = that.get_filename_from_url(image_url).split('%2F')[1];            
            console.log(`- ${file_name}`);
            img_urls.push(image_url);
          }
        }
      }
      cb(null, img_urls);
    });      
  },
  extension_check: function(url) {
    var extName = path.extname(url).toLowerCase();
    return extName === ".png" || extName === ".jpg" || extName === ".jpeg";
  },
  get_filename_from_url: function(url) {
    return url.substring(url.lastIndexOf('/') + 1);
  },
  load_random_image_remote: function(urls, cb) {
    console.log('loading remote image...');
    request({url: this.random_from_array(urls), encoding: null}, function (err, res, body) {
        if (!err && res.statusCode == 200) {
          var b64content = 'data:' + res.headers['content-type'] + ';base64,';
          console.log('image loaded...');
          cb(null, body.toString('base64'));           
        } else {
          console.log('ERROR:', err);
          cb(err);
        }
    });
  },  
};
