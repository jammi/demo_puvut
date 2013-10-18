  pupuwtf: {
    next: 'pupudramatic',
    time: 2000,
    fractalForestDel: function(){
      var
      forest = timeline.forest,
      i, forestNames=['treeGroup','taikaPaths',
      'taikaGroup','taika','taikaAnim','taikaAnim2',
      'taikaAnim3'];
      for( i in forestNames ){
        removeElem( forest[forestNames[i]] );
        forest[forestNames[i]] = null;
        delete forest[forestNames[i]];
      }
      removeElem(timeline.pupumush.pupu);
      timeline.pupumush.pupu = null;
      delete timeline.pupumush.pupu;
      for( i in forest.trees.groups ){
        removeElem( forest.trees.groups[i] );
      }
      forest.trees = {
        groups: [],
        positions: []
      };
    },
    drawPupuWTF: function(t,elems){
      var
      pframes = frames.bunny_ihme,
      paths = [],
      elem, anim, i, path;
      for(i in pframes){
        path = horizFlipSVGPath( pframes[i][0] );
        paths.push( path );
      }
      elem = timeline.pupumush.pupu;

      elems.push( elem );
      this.pupu = elem;
      anim = createSVGAnim( elem, t, 1000, 0, 'd',
        paths.join(';')+';'
      );
      setTimeout(function(){
        removeElem(anim);
        setSVGAttrs( elem, {
          d: paths[3]
        } );
      }, 1000 );
      elems.push( anim );
    },
    init: function(t,elems){
      var
      elems=[], i,
      _this = this;
      this.drawPupuWTF(t,elems);
      return function(){
        _this.fractalForestDel();
        for( i in elems ){ removeElem( elems[i] ); }
      };
    }
  },
