var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    request = require('request'),
    app = express(),   
    Twit = require('twit'),
    config = {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    };

var T = new Twit(config);

function random_from_array(images){
  return images[Math.floor(Math.random() * images.length)];
}

function upload_random_image_remote(urls, callback){
  console.log('Loading remote image...');

    request({url: random_from_array(urls), encoding: null}, function (err, res, body) {
        if (!err && res.statusCode == 200) {
          var b64content = 'data:' + res.headers['content-type'] + ';base64,',
              image = body.toString('base64');
              console.log('Image loaded!');

          T.post('media/upload', { media_data: image }, function (err, data, response) {
            if (err){
              console.log('ERROR:');
              console.log(err);
              // response.sendStatus(500);
            }
            else{
              console.log('Now tweeting it...');

              T.post('statuses/update', {
                /* You can include text with your image as well. */            
                // status: 'New picture!', 
                /* Or you can pick random text from an array. */            
                status: random_from_array([
                  'New picture!',
                  'Check this out!',
                  'How cute!'
                ]), 
                media_ids: new Array(data.media_id_string)
              },
                function(err, data, response) {
                  if (err){
                    console.log('ERROR:');
                    console.log(err);
                    // response.sendStatus(500);
                  }
                  else{
                    console.log('Posted an image!');
                    // response.sendStatus(200);
                  }
                }
              );
            }
          });            
        } else {
            console.log('ERROR:');
            console.log(err);
            // response.sendStatus(500);
        }
    });
}

function extension_check(url) {
/* Check if file has a known image extension, courtesy of revdancatt. */
    var extName;
    extName = path.extname(url).toLowerCase();
    return extName === ".png" || extName === ".jpg" || extName === ".jpeg";
};

app.get("/", function (request, response) {
    response.writeHeader(200, {"Content-Type": "text/html"});  
    response.write('<h1>random-image-twitterbot</h1><a href="https://glitch.com/edit/#!/random-image-twitterbot">See README.md</a>');  
    response.end();  
});

app.all("/tweet", function (request, response) {
  console.log("Received a request...");

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
        console.log(url);
        if (url && extension_check(url)){
          urls.push(url);
        }
      }
    }
    upload_random_image_remote(urls);
  });  
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
