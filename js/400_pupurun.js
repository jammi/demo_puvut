    // pupu sits to eat
    pupurun: {
      time: 4000,
      next: 'end',
      init: function(t,selfKill){
        var i, elems = [], anims = [],
        paths = frames.bunny_leap,
        lpath0 = scaleSVGPath( horizFlipSVGPath( paths[0][0] ), 0.6 ),
        lpath1 = scaleSVGPath( horizFlipSVGPath( paths[1][0] ), 0.6 ),
        lpath2 = scaleSVGPath( horizFlipSVGPath( paths[2][0] ), 0.6 ),
        lpath3 = scaleSVGPath( horizFlipSVGPath( paths[3][0] ), 0.6 ),
        rpath0 = scaleSVGPath( paths[0][0], 0.75 ),
        rpath1 = scaleSVGPath( paths[1][0], 0.75 ),
        rpath2 = scaleSVGPath( paths[2][0], 0.75 ),
        rpath3 = scaleSVGPath( paths[3][0], 0.75 ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(-330,100)'
        } ),
        group2 = createSVGGroup( svgDoc, {
          transform: 'translate(1330,150)'
        } ),
        bunny0 = createSVGPath( group, lpath0, colors.bunny0[0], 4, colors.bunny0[1] ),
        bunny1 = createSVGPath( group2, rpath0, colors.bunny0[0], 4, colors.bunny0[1] ),
        foo;
        elems.push( bunny0 );
        elems.push( bunny1 );
        elems.push( group );
        anims.push(
          createSVGAnim( bunny0, t, 1100, 'indefinite', 'd', [
            lpath0,
            lpath1,
            lpath2,
            lpath3
          ].join(';')+';' )
        );
        anims.push(
          createSVGAnim( bunny1, t, 1100, 'indefinite', 'd', [
            rpath0,
            rpath1,
            rpath2,
            rpath3
          ].join(';')+';' )
        );
        anims.push( createSVGMoveAnim( group, t, 2200, 0, '-330,100', '1500,100' ) );
        anims.push( createSVGMoveAnim( group2, t+500, 2200, 0, '1330,150', '-330,150' ) );
        var kill = function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
        if( selfKill ){
          setTimeout( kill, 4000 );
        }
        else {
          return kill;
        }
      }
    },
    // pupu sits to eat
    pupurun2: {
      time: 4000,
      next: 'end',
      init: function(t,selfKill){
        var i, elems = [], anims = [],
        paths = frames.bunny_leap,
        rpath0 = scaleSVGPath( horizFlipSVGPath( paths[0][0] ), 0.75 ),
        rpath1 = scaleSVGPath( horizFlipSVGPath( paths[1][0] ), 0.75 ),
        rpath2 = scaleSVGPath( horizFlipSVGPath( paths[2][0] ), 0.75 ),
        rpath3 = scaleSVGPath( horizFlipSVGPath( paths[3][0] ), 0.75 ),
        lpath0 = scaleSVGPath( paths[0][0], 0.6 ),
        lpath1 = scaleSVGPath( paths[1][0], 0.6 ),
        lpath2 = scaleSVGPath( paths[2][0], 0.6 ),
        lpath3 = scaleSVGPath( paths[3][0], 0.6 ),
        group2 = createSVGGroup( svgDoc, {
          transform: 'translate(-330,100)'
        } ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(1330,150)'
        } ),
        bunny0 = createSVGPath( group, lpath0, colors.bunny0[0], 4, colors.bunny0[1] ),
        bunny1 = createSVGPath( group2, rpath0, colors.bunny0[0], 4, colors.bunny0[1] ),
        foo;
        elems.push( bunny0 );
        elems.push( bunny1 );
        elems.push( group );
        anims.push(
          createSVGAnim( bunny0, t, 1100, 'indefinite', 'd', [
            lpath0,
            lpath1,
            lpath2,
            lpath3
          ].join(';')+';' )
        );
        anims.push(
          createSVGAnim( bunny1, t, 1100, 'indefinite', 'd', [
            rpath0,
            rpath1,
            rpath2,
            rpath3
          ].join(';')+';' )
        );
        anims.push( createSVGMoveAnim( group, t, 2200, 0, '1500,100', '-330,100' ) );
        anims.push( createSVGMoveAnim( group2, t+500, 2200, 0, '-330,150', '1330,150' ) );
        var kill = function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
        if( selfKill ){
          setTimeout( kill, 4000 );
        }
        else {
          return kill;
        }
      }
    },
