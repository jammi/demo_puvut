    // pupu sits to eat
    pupueat3: {
      time: 1800,
      next: 'fractal',
      init: function(t){
        var
        paths = frames.bunny_loopeater,
        elem, anim, i,
        path0 = transSVGPath( paths[0][0], [ -75, -10 ], 1.4 ),
        path1 = transSVGPath( paths[1][0], [ -75, -10 ], 1.4 ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(700,330)'
        } ),
        elems = [
          group,
          createSVGPath( group, path1, colors.bunny0[0], 4, colors.bunny0[1] )
        ],
        anims = [
          createSVGAnim( elems[1], t, 200, 'indefinite', 'd', [
            path0,
            path1
          ].join(';')+';' )
        ],
        i;
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      }
    },
