    // pupu sits to eat
    pupueat: {
      time: 1600,
      next: 'pupueat2',
      init: function(t){
        var
        paths = frames.bunny_hoptoass,
        elem, anim, i,
        path0 = transSVGPath( paths[0][0], [ -100, -30 ], 1.5 ),
        path1 = transSVGPath( paths[1][0], [ -100, -30 ], 1.5 ),
        path2 = transSVGPath( paths[2][0], [ -100, -30 ], 1.5 ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(670,320)'
        } ),
        elems = [
          group,
          createSVGPath( group, path2, colors.bunny0[0], 4, colors.bunny0[1] )
        ],
        anims = [
          createSVGAnim( elems[1], t, 1600, 0, 'd', [
            path0,
            path1,
            path2
          ].join(';')+';' )
        ],
        i;
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      }
    },
