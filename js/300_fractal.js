    fractal: {
      time: 1000,
      next: 'fractal',
      init: function(t){
        var fractStart = now();
        frames.fracttree = [];
        var
        paths = [],
        elems = [],
        depth = 0,
        degToRad = Math.PI / 180.0,
        group = createSVGGroup(svgDoc,{transform: 'translate(680,0)'}),
        drawFract = function(x,y,x2,y2){
          var path = 'M'+x+','+y+' L'+x2+','+y2+' z', color;
          color = (depth<4)?'#531':((depth<7)?'#452':((depth<10)?'#471':'#392'));
          return createSVGPath( group, path, color, 12-depth )
        },
        genFract = function(nodes){
          if( depth == 12 ){
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
            x2 = x + Math.round(Math.cos(deg * degToRad) * len);
            y2 = y + Math.round(Math.sin(deg * degToRad) * len);
            elems.push( drawFract(x,y,x2,y2) );
            len2 = len*0.8,
            rand = function(deg){
              return deg+Math.round(Math.random()*20)-10;
            }
            if( depth < 4 || Math.random() > 0.2){
              nextNodes.push( [x2,y2,len2,rand(deg-33)] );
            }
            if( Math.random() > 0.9 ){
              nextNodes.push( [x2,y2,len2,rand(deg)] );
            }
            if( depth < 4 || Math.random() < 0.8 ){
              nextNodes.push( [x2,y2,len2,rand(deg+33)] );
            }
          }
          depth++;
          genFract(nextNodes);
        },
        initCoords = [[0,680,130,270]];
        setStyles(group);
        genFract(initCoords);
        elems.push( group );
        console.log('took:',now()-fractStart);
        return function(){
          for( var i in elems ){ removeElem( elems[i] ); }
        };
      }
    },
