  firstNext = next,
  prevKill,
  prevItem,
  runTime = 0,
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
  endTimeElem = (function(){
    if(!devel){return null;}
    var elem = createElem(b,'div');
    setStyles( elem, {
      zIndex: 10001,
      fontSize: '20px',
      lineHeight: '20px',
      height: '20px',
      color: '#fff',
      position: 'absolute',
      right: 0, bottom: '20px',
      fontFamily: 'sans-serif'
    } );
    return elem;
  })(),
  timelineElem = (function(){
    if(!devel){return null;}
    var elem = createElem(b,'div');
    setStyles( elem, {
      zIndex: 10002,
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
  itemStart = 0,
  itemTime = 0,
  endTime = 0,
  svgDoc = createSVG( b, svgRect, '0,0,1280,720', true ),
  nextStep = function(){
    // console.log(svgDoc.getCurrentTime());
    var
    start = now(), end, took,
    item,
    timelineText,
    prevNext = next,
    kill;
    itemStart = start;
    if( next ){
      item = timeline[next];
      // devel && console.log('start time of ',next,': ',(now()-timerStarted));
      endTime = item.time;
      itemTime = endTime;
      devel && (timelineText = 'item: '+next);
      next = item.next;
      devel && (timelineText += '<br>next: '+next);
      devel && (timelineElem.innerHTML = timelineText);
      if( !skipTo || prevNext == skipTo ){
        if( skipTo ){
          skipTo = false;
          svgDoc.setCurrentTime(runTime/1000);
        }
        if( prevNext == 'load' ){
          setTimeout( function(){
            timeline.music.play();
          }, 1400 );
        }
        // else {
        //   timeline.music.currentTime = svgDoc.getCurrentTime()-1.4;
        //   timeline.music.play();
        // }
        kill = item.init(Math.round(svgDoc.getCurrentTime()*1000));
        if( prevKill ){
          setTimeout( prevKill, 50 );
          prevKill = null;
        }
        if( kill ){
          prevKill = kill;
        }
      }
      prevItem = item;
    }
    else {
      return;
    }

    if( !endTime ){
      endTime = 0;
    }

    if(skipTo){
      endTime-=10;
      runTime += endTime;
      timerStarted -= endTime;
      setTimeout( nextStep, 10 );
    }
    else {
      end = now(); took = end-start;
      endTime -= took - 10;
      if( endTime < 10 ){ endTime = 10; }
      runTime += endTime;
      devel && (
        endTimeElem.innerHTML = (
          ' start: ' + (itemStart-timerStarted) +
          ' dur: ' + itemTime +
          ' end: '+runTime)+'ms'
        );
      setTimeout( nextStep, endTime );
    }
  };
  timeline = {
    musicLoaded: false,
    music: (function(){
      var
      music = createElem( b, 'audio', { src: 'mc_misse-muukalaiswewd.mp3' } );
      music.volume = 0;
      music.play();
      music.addEventListener('canplay',function(){
        if( timeline.musicLoaded ){return;}
        timeline.musicLoaded = true;
        console.log('canplay');
        music.pause();
        setTimeout( function(){
          music.volume = 1;
          music.currentTime=0;
          svgDoc.setCurrentTime(0);
          createTimer();
          nextStep();
        }, 1000 );
      });
      return music;
    })(),
