    // pupu sits to eat
    pupueat: {
      time: 800,
      next: 'pupueat2',
      init: function(t){
        var
        paths = frames.bunny_hoptoass,
        elem, anim, i,
        bpaths = frames.bunny_eats,
        bpath0 = transSVGPath( bpaths[0][0], [ -120, -20 ], 1.33 ),
        bpath1 = transSVGPath( bpaths[1][0], [ -120, -20 ], 1.33 ),
        bpath2 = transSVGPath( bpaths[2][0], [ -120, -20 ], 1.33 ),

        path0 = transSVGPath( paths[0][0], [ -100, -30 ], 1.5 ),
        path1 = transSVGPath( paths[1][0], [ -100, -30 ], 1.5 ),
        path2 = transSVGPath( paths[2][0], [ -100, -30 ], 1.5 ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(470,320)'
        } ),
        elems = [
          group,
          createSVGPath( group, path1, colors.bunny0[0], 4, colors.bunny0[1] )
        ],
        anims = [
          createSVGAnim( elems[1], t, 800, 0, 'd', [
            path0,
            path1,
            path2,
            bpath0,
            bpath1,
            bpath2
          ].join(';')+';' )
        ],
        i;
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      }
    },
