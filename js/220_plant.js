    // morphs the tie into a seed
    plant: {
      init: function(t){
        var
        paths = frames.rusetti,
        path0 = transSVGPath( paths[0][0], [ 480, 210 ], 1 ),
        path1 = transSVGPath( paths[1][0], [ 400, 350 ], 1.5 ),
        path2 = transSVGPath( paths[2][0], [ 340, 340 ], 2 ),
        path3 = transSVGPath( paths[3][0], [ 410, 410 ], 1.5 ),
        path4 = transSVGPath( paths[3][0], [ 410, 480 ], 1.5 ),
        elem = createSVGPath( svgDoc, path0, '#fff', 4, '#c30' ),
        anim = createSVGAnim( elem, t, 1100, 0, 'd', [
            path0,
            path1,
            path2,
            path3,
            path4
          ].join(';')+';'
        ),
        anim2 = createSVGAnim( elem, t, 1800, 0, 'fill',
          '#c33;#c63;#673;#c93;#c33;'
        ),
        anim3 = createSVGAnim( elem, t, 1000, 0, 'stroke',
          '#fff;#000;'
        ),
        elems = [elem],
        anims = [anim,anim2,anim3],
        i;
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      },
      time: 1100,
      next: 'plant2'
    },
