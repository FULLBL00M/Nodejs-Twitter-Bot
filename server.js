var fs = require('fs'),
    path = require('path'),
    request = require('request'),
    Twit = require('twit'),
    config = {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    };

var T = new Twit(config);

function pick_random_image(images){
  return images[Math.floor(Math.random() * images.length)];
}

function upload_random_image_remote(urls, callback){
  console.log('Loading remote image...');

    request({url: pick_random_image(urls), encoding: null}, function (err, res, body) {
        if (!err && res.statusCode == 200) {
          var b64content = 'data:' + res.headers['content-type'] + ';base64,',
              image = body.toString('base64');
              console.log('Image loaded!');

          T.post('media/upload', { media_data: image }, function (err, data, response) {
            if (err){
              console.log('ERROR:');
              console.log(err);
            }
            else{
              console.log('Now tweeting it...');

              T.post('statuses/update', {
                media_ids: new Array(data.media_id_string)
              },
                function(err, data, response) {
                  if (err){
                    console.log('ERROR:');
                    console.log(err);
                  }
                  else{
                    console.log('Posted an image!');
                  }
                }
              );
            }
          });            
        } else {
            console.log('ERROR:');
            console.log(err);
        }
    });
}

function extension_check(url) {
/* Check if file has a known image extension, courtesy of revdancatt. */
    var extName;
    extName = path.extname(url).toLowerCase();
    return extName === ".png" || extName === ".jpg" || extName === ".jpeg";
};

fs.readFile('./.glitch-assets', 'utf8', function (err,data) {
  if (err) {
    console.log('ERROR:');
    console.log(err);
    return false;
  }
  data = data.split('\n');
  var urls = [], url;
  
  for (var i = 0, j = data.length; i < j; i++){
    if (data[i].length){
      url = JSON.parse(data[i]).url;
      if (extension_check(url)){
        urls.push(url);
      }
    }
  }
  
  /* Since apps on Glitch go to sleep after five minutes of inactivity, the setTimeout approach won't work. */

  // setInterval(function(){
  //   upload_random_image_remote(urls);
  // }, 10000);

  /* Instead, you can use a site like cron-job.org to periodically wake up your bot every hour and run the upload_random_image_remote function. */
  upload_random_image_remote(urls);

});
