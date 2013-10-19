  pupufuck: {
    time: 22000,
    next: 'end',
    drawFuckers: function(t,elems,grp,scale){
      var
      pframes = frames.bunny_fuckers,
      paths = [],
      group = grp,
      elem, anim, i, j, path;
      for( i in pframes[0] ){
        path = scaleSVGPath( pframes[1][i], scale );
        elem = createSVGPath( group, path, '#fff', 4, '#666' );
        elems.push( elem );
        paths = [];
        for( j in pframes ){
          paths.push( scaleSVGPath( pframes[j][i], scale ) );
        }
        paths.push( path );
        anim = createSVGAnim( elem, t, 400, 'indefinite', 'd',
          paths.join(';')+';'
        );
        elems.push(anim);
      }
    },
    init: function(t){
      console.log('fuck.');
      return function(){
        for( i in elems ){
          removeElem(elems[i]);
        }
      };
    }
  },
