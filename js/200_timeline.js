  var
  next = 'load',
  timeline = {
    load: {
      init: function(){
        return function(){

        };
      },
      time: 4000,
      next: 'intro'
    },
    intro: {
      init: function(){

      },
      next: 'plant'
    },
    plant: {
      init: function(){

      },
      next: false
    }
  },
  nextStep = function(){

  },
  checkStep = function(){
    var
    start = now(), end, took,
    endTime = false;

    if( !endTime ){
      return;
    }
    end = now(); took = end-start;
    endTime -= took; endTime -= 10;
    if( endTime < 10 ){ endTime = 10; }
    setTimeout( checkStep, endTime );
  };
  checkStep();
