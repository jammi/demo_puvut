  next = 'load',
  prevKill,
  prevItem,
  runTime = 0,
  nextStep = function(){
    var
    start = now(), end, took,
    item,
    endTime = false;

    if( prevKill ){
      prevKill();
      prevKill = null;
    }

    if( next ){
      item = timeline[next];
      console.log('next:',next,item);
      endTime = item.time;
      next = item.next;
      prevKill = item.init(runTime);
      prevItem = item;
    }
    else {
      return;
    }

    if( !endTime ){
      endTime = 0;
    }

    end = now(); took = end-start;
    endTime -= took - 10;

    if( endTime < 10 ){ endTime = 10; }
    runTime += endTime;
    setTimeout( nextStep, endTime );
  };
  timeline = {
