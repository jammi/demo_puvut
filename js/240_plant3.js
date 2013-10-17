    // shows the plant
    plant3: {
      time: 1000,
      next: 'pupuentry',
      init: function(t){
        var
        paths = frames.taimi2kasvaa,
        path0 = transSVGPath( paths[2][0], [ 480, 450 ], 1 );
        this.plant = createSVGPath( svgDoc, path0, '#fff', 4, colors.plant0[1] );
        return function(){
        };
      }
    },
