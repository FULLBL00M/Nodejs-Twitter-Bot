var express = require('express'),
    helpers = require(__dirname + '/helpers.js'),
    tweet = require(__dirname + '/tweet.js'),
    fs = require('fs'),
    path = require('path'),
    request = require('request'),
    app = express();


app.get("/", function (req, res) {
    res.writeHeader(200, {"Content-Type": "text/html"});  
    res.write('<h1>random-image-twitterbot</h1><a href="https://glitch.com/edit/#!/random-image-twitterbot">See README.md</a>');  
    res.end();  
});

app.all("/tweet", function (req, res) {
  console.log("Received a request...");

  fs.readFile('./.glitch-assets', 'utf8', function (err,data) {
    if (err) {
      console.log('error:', err);
      return false;
    }
    
    data = data.split('\n');
    var urls = [], url;

    for (var i = 0, j = data.length; i < j; i++){
      if (data[i].length){
        url = JSON.parse(data[i]).url;
        console.log(url);
        if (url && helpers.extension_check(url)){
          urls.push(url);
        }
      }
    }
    helpers.upload_random_image_remote(urls, function(img_data){
      tweet.post_image(helpers.random_from_array([
        'Check this out!',
        'New picture!'
      ]), img_data);      
    });
  });  
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
