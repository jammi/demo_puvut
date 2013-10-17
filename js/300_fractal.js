    fractal: {
      time: 1000,
      next: 'pupurun',
      init: function(t){
        var
        paths = [],
        elems = [],
        i, path;
        tree = frames.fract_tree[0];
        for( i in tree ){
          elems.push( createSVGPath( svgDoc,
            transSVGPath( tree[i], [ 274, 0 ], 2.2 ),
          colors.tree0[0], 4 ) );
        }
        return function(){
          for( i in elems ){ removeElem( elems[i] ); }
        };
      }
    },
