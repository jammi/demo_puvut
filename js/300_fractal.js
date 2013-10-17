    fractal: {
      time: 30000,
      next: 'pupurun',
      init: function(t){
        frames.fracttree = [];
        var
        paths = [],
        elems = [],
        depth = 0,
        genFract = function(nodes){
          console.log('nodes:',nodes)
          if( depth == 6 ){
            return;
          }
          var
          nextNodes = [],
          node, i,
          x, y, len, deg;
          for( i in nodes ){
            node = nodes[i];
            x = node[0];
            y = node[1];
            len = node[2];
            deg = node[3];
            var
            x2 = x,
            y2 = y,
            len2 = len*0.8,
            rand = function(deg){
              return deg+Math.round(Math.random()*10)-20;
            }
            nextNodes.push( [x2,y2,len2,rand(deg-30)] );
            nextNodes.push( [x2,y2,len2,rand(deg+30)] );
          }
          depth++;
          genFract(nextNodes);
        };
        genFract([[680,720,200,0]]);
        return function(){
          for( var i in elems ){ removeElem( elems[i] ); }
        };
      }
    },
