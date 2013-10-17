    fractal: {
      time: 10000,
      next: 'fractal',
      defaultTreeOpts: {
        animDraw: false,
        maxDepth: 10,
        startX: 0,
        startY: 680,
        startLen: 150,
        startDeg: 270,
        isRandom: true
      },
      init: function(t,treeOpts){
        var fractStart = now();
        frames.fracttree = [];
        if(!treeOpts){
          treeOpts = {}
        };
        for(var tkey in this.defaultTreeOpts){
          // console.log('tkey:',tkey,' = ',this.defaultTreeOpts[tkey])
          treeOpts[tkey] = this.defaultTreeOpts[tkey];
        }
        if(!treeOpts.group){
          treeOpts.group = createSVGGroup(svgDoc,{transform: 'translate(680,0)'});
        }
        var
        animDraw = treeOpts.animDraw,
        maxDepth = treeOpts.maxDepth,
        startX = treeOpts.startX,
        startY = treeOpts.startY,
        startLen = treeOpts.startLen,
        startDeg = treeOpts.startDeg,
        isRandom = treeOpts.isRandom,
        paths = [],
        elems = [],
        depth = 0,
        degToRad = Math.PI / 180.0,
        group = treeOpts.group,
        drawFract = function(x,y,x2,y2){
          var path = 'M'+x+','+y+' L'+x2+','+y2+' z', color, width;
          color = (depth<4)?'#531':((depth<7)?'#452':((depth<10)?'#471':'#392'));
          // width = Math.round(17-depth*(depth*0.5)*0.4);
          // (width < 3) && (width = 3);
          width = maxDepth+2-depth;
          return createSVGPath( group, path, color, width )
        },
        genFract = function(nodes){
          if( depth == maxDepth ){
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
              if(!isRandom){ return deg; }
              return deg+Math.round(Math.random()*20)-10;
            }
            if( !isRandom || depth < 4 || Math.random() > 0.1){
              nextNodes.push( [x2,y2,len2,rand(deg-33)] );
            }
            if( isRandom && Math.random() > 0.8 ){
              nextNodes.push( [x2,y2,len2,rand(deg)] );
            }
            if( !isRandom || depth < 4 || Math.random() < 0.9 ){
              nextNodes.push( [x2,y2,len2,rand(deg+33)] );
            }
          }
          depth++;
          genFract(nextNodes);
        },
        initCoords = [[startX,startY,startLen,startDeg]];
        setStyles(group);
        genFract(initCoords);
        elems.push( group );
        setTimeout( function(){
          console.log('took:',now()-fractStart-10);
        }, 10 );
        return function(){
          setStyles( group, { visibility: 'hidden' } );
          removeElem( group );
        };
      }
    },
