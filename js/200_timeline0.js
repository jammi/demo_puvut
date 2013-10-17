  next = 'load',
  prevKill,
  prevItem,
  runTime = 0,
  nextStep = function(){
    var
    start = now(), end, took,
    item,
    kill,
    endTime = false;
    if( next ){
      item = timeline[next];
      console.log('next:',next,item);
      endTime = item.time;
      next = item.next;
      kill = item.init(runTime);
      if( prevKill ){
        setTimeout( prevKill, 50 );
        prevKill = null;
      }
      if( kill ){
        prevKill = kill;
      }
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
