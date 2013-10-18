    pupueat4: {
      time: 1100,
      next: 'pupueat5',
      // next: 'plant3',
      init: function(t){
        var
        paths = frames.bunny_eats, elem, anim, i,
        path5 = transSVGPath( paths[0][0], [ -120, -20 ], 1.33 ),
        path4 = transSVGPath( paths[1][0], [ -120, -20 ], 1.33 ),
        path3 = transSVGPath( paths[2][0], [ -120, -20 ], 1.33 ),
        path2 = transSVGPath( paths[3][0], [ -120, -20 ], 1.33 ),
        path1 = transSVGPath( paths[4][0], [ -120, -20 ], 1.33 ),
        path0 = transSVGPath( paths[5][0], [ -120, -20 ], 1.33 ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(475,330)'
        } ),
        elems = [
          group,
          createSVGPath( group, path5, colors.bunny0[0], 4, colors.bunny0[1] )
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
    pupueat5: {
      time: 1200,
      next: 'pupuexit',
      init: function(t){
        var
        paths = frames.bunny_hoptoass,
        elem, anim, i,
        path2 = transSVGPath( paths[0][0], [ -100, -30 ], 1.5 ),
        path1 = transSVGPath( paths[1][0], [ -100, -30 ], 1.5 ),
        path0 = transSVGPath( paths[2][0], [ -100, -30 ], 1.5 ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(470,320)'
        } ),
        elems = [
          group,
          createSVGPath( group, path1, colors.bunny0[0], 4, colors.bunny0[1] )
        ],
        anims = [
          createSVGAnim( elems[1], t, 1200, 0, 'd', [
            path0,
            path1,
            // path2
          ].join(';')+';' )
        ],
        i;
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      }
    },
