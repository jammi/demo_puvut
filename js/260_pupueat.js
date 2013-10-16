    // pupu sits to eat
    pupueat: {
      time: 1200,
      next: 'pupueat2',
      init: function(t){
        var
        paths = frames.bunny_hoptoass,
        elem, anim, i,
        path0 = transSVGPath( paths[0][0], [ -100, -30 ], 1.6 ),
        path1 = transSVGPath( paths[1][0], [ -100, -30 ], 1.6 ),
        path2 = transSVGPath( paths[2][0], [ -100, -30 ], 1.6 ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(700,330)'
        } ),
        elems = [
          group,
          createSVGPath( group, path2, '#fff', 4, '#fc0' )
        ],
        anims = [
          createSVGAnim( elems[1], t, 1100, 0, 'd', [
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
