    // grows the plant
    plant2: {
      time: 4000,
      next: 'plant3',
      init: function(t){
        var
        paths = frames.taimi,
        elem, anim,
        path0 = transSVGPath( paths[0][0], [ 480, 550 ], 1 ),
        path1 = transSVGPath( paths[1][0], [ 480, 550 ], 1 ),
        path2 = transSVGPath( paths[2][0], [ 480, 550 ], 1 ),
        elems = [],
        anims = [],
        i;
        elems.push( createSVGPath( svgDoc, path0, '#fff', 4, '#390' ) );
        anims.push( createSVGAnim( elems[0], t, 4000, 0, 'd', [
            path0,
            path1,
            path2
          ].join(';')+';'
        ) );
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      }
    },
