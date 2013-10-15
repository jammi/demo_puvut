  next = 'load',
  prevKill,
  prevItem,
  timeline = {
    load: {
      init: function(t){
        var
        paths = frames.puku[0],
        elems = [],
        anims = [],
        i, path, elem, rusetti, ruAnims = [];
        for( i in paths ){
          path = transSVGPath( paths[i], [ 190, -55 ], 3 );
          elem = createSVGPath( svgDoc, path, '#000', 4 );
          elems.push( elem );
          anims.push( createSVGAnim( elem, t, 1000, 0, 'd',
            offsetSVGPath( path, [ 0, 720 ] )+';'+path+';' ) );
          anims.push( createSVGAnim( elem, t, 6000, 0, 'stroke',
            '#fff;#fff;' ) );
          anims.push( createSVGAnim( elem, t+6000, 1000, 0, 'stroke',
            '#fff;#000;' ) );
        }
        path = transSVGPath( frames.rusetti_still[0][0], [ 480, 210 ], 1 );
        rusetti = createSVGPath( svgDoc, path, '#fff', 4, '#c33' );
        this.rusetti = rusetti;
        this.ruAnims = ruAnims;
        var
        ruPath1 = transSVGPath( path, [ 0, 0 ], 1 );
        ruPath2 = transSVGPath( path, [ -620, -280 ], 2 );
        ruAnims.push( createSVGAnim( rusetti, t+4500, 500, 'indefinite', 'd',
          ruPath1+';'+ruPath2+';'+ruPath1 ) );
        anims.push( createSVGAnim( rusetti, t, 1500, 0, 'd',
          offsetSVGPath( path, [ 0, -600 ] )+';'+path+';' ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+1500, 1000, 0, 0, 30 ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+2500, 2000, 0, 30, -30 ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+4500, 1000, 0, -30, 60 ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+5500, 1000, 0, 60, -90 ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+6500, 500, 0, -90, 90 ) );
        // ruAnims.push( createSVGRotAnim( rusetti, 7000, 3000, 'indefinite', 90, 1170 ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+7000, 3000, 'indefinite', 90, 1170 ) );
        return function(){
          for( i in anims ){ removeElem( anims[i] ); }
          for( i in elems ){ removeElem( elems[i] ); }
        };
      },
      time: 7000,
      next: 'intro'
    },
    intro: {
      init: function(t){
        var
        _init = prevItem,
        i,
        rusetti = _init.rusetti,
        ruPath  = _init.ruPath,
        ruAnims = _init.ruAnims;
        return function(){
          for( i in ruAnims ){ removeElem( ruAnims[i] ); }
          removeElem( rusetti );
        };
      },
      time: 15000,
      next: 'plant'
    },
    plant: {
      init: function(t){
        console.log('plant');
        var
        paths = frames.rusetti,
        path0 = transSVGPath( paths[0][0], [ 480, 210 ], 1 ),
        path1 = transSVGPath( paths[1][0], [ 480, 310 ], 1.5 ),
        path2 = transSVGPath( paths[2][0], [ 480, 340 ], 2 ),
        elem = createSVGPath( svgDoc, path0, '#fff', 4, '#c30' ),
        anim = createSVGAnim( elem, t, 2000, 0, 'd', [
            path0,
            path1,
            path2
          ].join(';')+';'
        ),
        anim2 = createSVGAnim( elem, t, 2300, 0, 'fill',
          '#c33;#3c3;'
        ),
        elems = [elem],
        // anims = [anim,anim2],
        anims = [anim2],
        i;
        setTimeout()
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      },
      time: 2300,
      next: 'plant2'
    },
    plant2: {
      time: 0,
      next: 'end',
      init: function(t){}
    },
    end: {
      init: function(t){
        window.location.reload(true);
      }
    }
  },
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
      endTime = item.time;
      console.log('next:',next,item);
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
  setStyles( svgDoc, {
    borderRight: '1px solid #fc0',
    borderBottom: '1px solid #fc0'
  } );
  nextStep();
