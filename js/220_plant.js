    // morphs the tie into a seed
    plant: {
      init: function(t){
        var
        paths = frames.rusetti,
        path0 = transSVGPath( paths[0][0], [ 480, 210 ], 1 ),
        path1 = transSVGPath( paths[1][0], [ 480, 310 ], 1.5 ),
        path2 = transSVGPath( paths[2][0], [ 480, 340 ], 2 ),
        elem = createSVGPath( svgDoc, path0, '#fff', 4, '#c30' ),
        anim = createSVGAnim( elem, t, 2000, 0, 'd', [
            path0,
            path1,
            path2
          ].join(';')+';'
        ),
        anim2 = createSVGAnim( elem, t, 2300, 0, 'fill',
          '#c33;#3c3;'
        ),
        elems = [elem],
        // anims = [anim,anim2],
        anims = [anim2],
        i;
        setTimeout()
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      },
      time: 2300,
      next: 'plant2'
    },
