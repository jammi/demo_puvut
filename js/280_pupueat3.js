    // pupu sits to eat
    pupueat3: {
      time: 1800,
      next: 'end',
      init: function(t){
        var
        paths = frames.bunny_loopeater,
        elem, anim, i,
        path0 = transSVGPath( paths[0][0], [ -100, -30 ], 1.6 ),
        path1 = transSVGPath( paths[1][0], [ -100, -30 ], 1.6 ),
        group = createSVGGroup( svgDoc, {
          transform: 'translate(700,330)'
        } ),
        elems = [
          group,
          createSVGPath( group, path1, '#fff', 4, '#fc0' )
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
