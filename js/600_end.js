    // reloads the page
    end: {
      init: function(t){
        var i=0, vols=[];
        for( i; i<10; i++ ){
          vols.push( 1-(i/10) );
          setTimeout(function(){
            var vol = vols.shift();
            timeline.music.volume=vol;
          },(200*i));
        }
        setTimeout(function(){
          timeline.music.volume=0;
        },2100);
        // devel && setTimeout( window.location.reload(true), 5000 );
      }
    }
