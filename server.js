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

function download(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
}

function pick_random_image(images){
  return images[Math.floor(Math.random() * images.length)];
}


function upload_random_image(images){
  console.log('Opening an image...');
  var image_path = path.join(__dirname, '/assets/' + pick_random_image(images)),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Uploading an image...');


function upload_random_image_remote(urls){
  console.log('Loading remote image...');
  
  request.get(pick_random_image(urls), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var b64content = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
      // console.log(b64content);

      T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        if (err){
          console.log('ERROR:');
          console.log(err);
        }
        else{
          console.log('Image uploaded!');
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
      
        
        
        // console.log(body);
          // Continue with your processing here.
      }
  });
  
  
  

  }
}


// fs.readdir(__dirname, function(err, files) {

fs.readFile('./.glitch-assets', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  data = data.split('\n');
  var urls = [];

  
  for (var i = 0, j = data.length; i < j; i++){
    if (data[i].length){
      urls.push(JSON.parse(data[i]).url);    
    }
  }
  // upload_random_image_remote(urls);
  console.log(pick_random_image(urls)); 
  upload_random_image_remote(pick_random_image(urls));
});

//   /*
//     You have two options here. Either you will keep your bot running, and upload images using setInterval (see below; 10000 means '10 milliseconds', or 10 seconds), --
//   */
//     setInterval(function(){
//       upload_random_image(images);
//     }, 10000);

//   /*
//     Or you could use cron (code.tutsplus.com/tutorials/scheduling-tasks-with-cron-jobs--net-8800), in which case you just need:
//   */

//     // upload_random_image(images);
