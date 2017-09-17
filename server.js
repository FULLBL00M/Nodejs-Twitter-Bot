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
  console.log("received a request...");
  
  helpers.load_image_assets(function(err, urls){
    helpers.load_random_image_remote(urls, function(err, img_data){
      tweet.post_image(helpers.random_from_array([
        'Check this out!',
        'New picture!'
      ]), img_data);      
    });
  });
  res.sendStatus(200);
});

var listener = app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
