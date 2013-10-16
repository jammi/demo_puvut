    // shows the bunny
    pupuentry: {
      time: 2200,
      next: 'pupueat',
      init: function(t){
        var
        paths = frames.bunny_hop,
        elem, anim, i,
        path0 = transSVGPath( paths[0][0], [ -100, -30 ], 1.6 ),
        path1 = transSVGPath( paths[1][0], [ -100, -30 ], 1.6 ),
        path2 = transSVGPath( paths[2][0], [ -100, -30 ], 1.6 ),
        path3 = transSVGPath( paths[3][0], [ -100, -30 ], 1.6 ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(1280,330)'
        } ),
        elems = [
          group,
          createSVGPath( group, path0, '#fff', 4, '#fc0' )
        ],
        anims = [
          createSVGAnim( elems[1], t, 1100, 2, 'd', [
            path0,
            path1,
            path2,
            path3
          ].join(';')+';' ),
          createSVGMoveAnim( elems[0], t, 2200, 0, '1280,330', '700,330' )
        ],
        i;
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      }
    },
