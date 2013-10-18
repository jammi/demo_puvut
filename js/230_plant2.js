    // grows the plant
    plant2: {
      time: 4000,
      next: 'plant3',
      init: function(t){
        var
        paths = frames.taimi2kasvaa,
        apaths = frames.taimi,
        elem, anim,
        path0 = transSVGPath( apaths[0][0], [ 480, 450 ], 1.3 ),
        path1 = transSVGPath( apaths[1][0], [ 480, 450 ], 1.3 ),
        path2 = transSVGPath( apaths[2][0], [ 480, 450 ], 1.3 ),
        bpath0 = transSVGPath( paths[0][0], [ 270, 460 ], 1 ),
        bpath1 = transSVGPath( paths[1][0], [ 270, 460 ], 1 ),
        bpath2 = transSVGPath( paths[2][0], [ 270, 460 ], 1 ),
        elems = [],
        anims = [],
        i;
        elems.push( createSVGPath( svgDoc, path0, '#fff', 4, '#361' ) );
        anims.push( createSVGAnim( elems[0], t, 4200, 0, 'd', [
            path0,
            path1,
            path2
          ].join(';')+';'
        ) );
        elems.push( createSVGPath( svgDoc, bpath0, '#fff', 4, '#390' ) );
        anims.push( createSVGAnim( elems[1], t+1000, 3200, 0, 'd', [
            bpath0,
            bpath1,
            bpath2
          ].join(';')+';'
        ) );
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      }
    },
