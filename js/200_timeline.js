  next = 'load',
  prevKill,
  prevItem,
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
    item,
    endTime = false;

    if( next ){
      item = timeline[next];
      endTime = item.time;
      console.log('next:',next,item);
      next = item.next;
    }

    if( !endTime ){
      return;
    }

    end = now(); took = end-start;
    endTime -= took - 10;

    if( endTime < 10 ){ endTime = 10; }
    setTimeout( checkStep, endTime );
  };
  console.log('test');
  checkStep();
