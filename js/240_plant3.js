    // shows the plant
    plant3: {
      time: 1000,
      next: 'pupuentry',
      init: function(t){
        var
        paths = frames.taimi2kasvaa,
        apaths = frames.taimi,
        path0 = transSVGPath( apaths[2][0], [ 480, 450 ], 1.3 );
        bpath0 = transSVGPath( paths[2][0], [ 270, 460 ], 1 );
        this.bplant = createSVGPath( svgDoc, bpath0, '#fff', 4, colors.plant0[1] );
        this.plant = createSVGPath( svgDoc, path0, '#fff', 4, '#361' );
        return function(){
        };
      }
    },
