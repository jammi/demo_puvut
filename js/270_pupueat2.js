    // pupu sits to eat
    pupueat2: {
      time: 1100,
      next: 'pupueat3',
      init: function(t){
        var
        paths = frames.bunny_eats,
        elem, anim, i,
        path0 = transSVGPath( paths[0][0], [ -100, -30 ], 1.6 ),
        path1 = transSVGPath( paths[1][0], [ -100, -30 ], 1.6 ),
        path2 = transSVGPath( paths[2][0], [ -100, -30 ], 1.6 ),
        path3 = transSVGPath( paths[3][0], [ -100, -30 ], 1.6 ),
        path4 = transSVGPath( paths[4][0], [ -100, -30 ], 1.6 ),
        path5 = transSVGPath( paths[5][0], [ -100, -30 ], 1.6 ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(700,330)'
        } ),
        elems = [
          group,
          createSVGPath( group, path5, '#fff', 4, '#fc0' )
        ],
        anims = [
          createSVGAnim( elems[1], t, 1100, 0, 'd', [
            path0,
            path1,
            path2,
            path3,
            path4,
            path5
          ].join(';')+';' )
        ],
        i;
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      }
    },