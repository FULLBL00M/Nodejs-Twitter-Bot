module.exports = {
  postImage: function( text, image_base64, cb ) {
   T.post( 'media/upload', { media_data: image_base64 }, function ( err, data, response ) {
      if ( err ){
        console.log( 'ERROR:\n', err );
        if ( cb ){
          cb( err );
        }
      }
      else{
        console.log( 'tweeting the image...' );
        T.post( 'statuses/update', {
          status: text,
          media_ids: new Array( data.media_id_string )
        },
        function( err, data, response ) {
          if ( err ){
            console.log( 'error:', err );
          }
          else{
            console.log( 'tweeted', `https://twitter.com/${ data.user.screen_name }/status/${ data.id_str }` );            
          }
          if ( cb ){
            cb( err, data );
          }
        } );
      }
    } );
  }
};
