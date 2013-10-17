  next = 'load',
  prevKill,
  prevItem,
  runTime = 0,
  devel = true, // enable debug texts
  timerStarted,
  timerElem,
  createTimer = function(){
    if(!devel){return null;}
    timerStarted = now();
    timerElem = createElem(b,'div');
    setStyles( timerElem, {
      zIndex: 10000,
      fontSize: '20px',
      color: '#fff',
      position: 'absolute',
      right: 0, bottom: 0,
      height: '20px',
      fontFamily: 'sans-serif'
    });
    var updateTimer = function(){
      var timeNow = now();
      timerElem.innerText = (timeNow-timerStarted)+'ms';
    };
    devel && setInterval( updateTimer, 50 );
  },
  timelineElem = (function(){
    if(!devel){return null;}
    var elem = createElem(b,'div');
    setStyles( elem, {
      zIndex: 10001,
      fontSize: '20px',
      lineHeight: '20px',
      height: '40px',
      color: '#fff',
      position: 'absolute',
      left: 0, bottom: 0,
      fontFamily: 'sans-serif'
    } );
    return elem;
  })(),
  nextStep = function(){
    var
    start = now(), end, took,
    item,
    kill,
    endTime = false;
    if( next ){
      item = timeline[next];
      endTime = item.time;
      timelineText = 'item: '+next
      next = item.next;
      timelineText += '<br>next: '+next;
      devel && (timelineElem.innerHTML = timelineText);
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
