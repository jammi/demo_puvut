  pupurainbow: {
    time: 2200,
    next: 'invaders',
    init: function(t){
      var
      group = createSVGGroup(svgDoc,{
        transform: 'translate(0,0)'
      }),
      i, elems = [],
      scales = [
        0.25, 0.33, 0.59, 0.78, 1.0, 1.38
      ],
      colors = [
        '#ee70ff',
        '#ff729d',
        '#ffa56f',
        '#ffed77',
        '#b0ff69',
        '#5fffbf'
      ],
      paths = frames.bunny_leap, odd,
      apath, path, elem, anim, move, j=0,
      tops = [ 50, 75, 113, 169, 253, 380 ],
      top;
      for( ; j < 6; j++ ){
        odd = (j%2===1);
        apath = [];
        color = colors[j];
        scale = scales[j];
        top = tops[j];
        for( i in paths ){
          path = scaleSVGPath( paths[i][0], scale );
          if( odd ){
            path = horizFlipSVGPath( path );
          }
          apath.push( path );
        }
        elem = createSVGPath( group, apath[0], '#fff', j, color );
        if( odd ){
          move = createSVGMoveAnim( elem, t, 2200, 0, '-400,'+top, '1800,'+top );
        }
        else {
          move = createSVGMoveAnim( elem, t, 2200, 0, '1800,'+top, '-400,'+top );
        }
        anim = createSVGAnim( elem, t, 1100, 'indefinite', 'd', apath.join(';')+';' );
        elems.push(elem); elems.push(move); elems.push(anim);
      }
      return function(){
        for( i in elems ){
          removeElem(elems[i]);
        }
      };
    }
  },
