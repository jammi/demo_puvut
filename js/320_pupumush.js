  pupumush: {
    next: 'pupuwtf',
    time: 6000,
    pupuG: (function(){
      return createSVGGroup( svgDoc, {
        transform: 'translate(0,380)'
      } );
    })(),
    taikapupuStart: function(t, elems, anims){
      var
      pframes = frames.bunny_hop,
      paths = [],
      group = this.pupuG,
      elem, anim, i, path;
      setStyles(group,{visibility:'hidden'});
      for(i in pframes){
        path = horizFlipSVGPath( pframes[i][0] );
        paths.push( path );
      }
      elem = createSVGPath( group, paths[0], '#fff', 4, '#666' );
      this.pupu = elem;
      // elems.push( elem );
      anim = createSVGAnim( elem, t, 400, 3, 'd',
        paths.join(';')+';'
      );
      elems.push( anim );
      anim = createSVGMoveAnim( group, t, 1200, 0, '-200,380', '400,380', true );
      elems.push( anim );
      setTimeout(function(){setStyles(group,{visibility:'visible'});},10);
    },
    taikapupuEat: function(t, elems, anims){
      var
      pframes = frames.bunny_eats,
      paths = [],
      group = this.pupuG,
      elem, anim, i, path;
      for(i in pframes){
        path = horizFlipSVGPath( pframes[i][0] );
        paths.push( path );
      }
      setAttrs( this.pupu, {
        d: paths[5]
      });
      anim = createSVGAnim( this.pupu, t+1200, 400, 0, 'd',
        paths.join(';')+';'
      );
      elems.push( anim );
      anim = createSVGAnim( this.pupu, t+2400, 286, 'indefinite', 'd',
        paths[4]+';'+paths[5]+';'
      );
      elems.push( anim );
    },
    init: function(t){
      if( origSkip == 'pupumush' ){
        timeline.forest.staticThings();
        setSVGAttrs( timeline.forest.svg2, {
          transform: 'translate(-6000,0)'
        });
      }
      var
      elems = [],
      _forest = timeline.forest;

      this.taikapupuStart( t, elems );
      this.taikapupuEat( t, elems );
      setTimeout( function(){
        removeElem(_forest.taikaAnim3);
        setSVGAttrs( _forest.taika, {
          d: _forest.taikaPaths[6]
        });
      }, 4400 );
      _forest.taikaAnim3 = createSVGAnim( _forest.taika, t+2400, 2000, 0, 'd',
        _forest.taikaPaths.join(';')+';'
      );
      return function(){
        for( i in elems ){ removeElem( elems[i] ); }
      };
    }
  },
