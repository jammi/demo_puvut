    // pupu sits to eat
    pupueat2: {
      time: 1100,
      next: 'pupueat3',
      init: function(t){
        removeElem( timeline.plant3.bplant );
        timeline.pupurun2.init(t,true);
        var
        paths = frames.bunny_eats, elem, anim, i,
        path0 = transSVGPath( paths[0][0], [ -120, -20 ], 1.33 ),
        path1 = transSVGPath( paths[1][0], [ -120, -20 ], 1.33 ),
        path2 = transSVGPath( paths[2][0], [ -120, -20 ], 1.33 ),
        path3 = transSVGPath( paths[3][0], [ -120, -20 ], 1.33 ),
        path4 = transSVGPath( paths[4][0], [ -120, -20 ], 1.33 ),
        path5 = transSVGPath( paths[5][0], [ -120, -20 ], 1.33 ),
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
        i,
        plantpath0 = transSVGPath( frames.taimi_gets_eaten[0][0], [ 280, 450 ], 1 ),
        plantpath1 = transSVGPath( frames.taimi_gets_eaten[1][0], [ 280, 450 ], 1 ),
        plantpath2 = transSVGPath( frames.taimi_gets_eaten[2][0], [ 280, 450 ], 1 ),
        plantpath3 = transSVGPath( frames.taimi_gets_eaten[3][0], [ 280, 450 ], 1 ),
        plantpath4 = transSVGPath( frames.taimi_gets_eaten[4][0], [ 280, 450 ], 1 );
        this.plant = createSVGPath( svgDoc, plantpath0, '#fff', 4, colors.plant0[1] );
        this.plantanim = createSVGAnim( this.plant, t, 1100, 0, 'd', [
            plantpath0,
            plantpath1,
            plantpath2,
            plantpath3,
            plantpath4
          ].join(';')+';'
        );
        var _this = this;
        setTimeout( function(){
          removeElem( _this.plant );
          removeElem( _this.plantanim );
        }, 1050 );

        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
          for( i in anims ){ removeElem( anims[i] ); }
        };
      }
    },
