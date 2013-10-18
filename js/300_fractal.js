    fractal: {
      time: 7000,
      next: 'forest',
      defaultTreeOpts: {
        animDraw: true,
        animSpeed: 100, // ms
        maxDepth: 11,
        colors: [
          '#531','#531','#531','#531',
          '#452','#452','#452',
          '#471','#471','#471',
          '#392','#392','#392','#392'
        ],
        animStepCalls: 2,
        animStepFn: function(){
          var
          forest = timeline.forest,
          trees = forest.trees;
          if(trees.groups.length == 22){ return; }
          var
          size  = Math.round(Math.random()*20)+30,
          x = (trees.groups.length*75-size+1500),
          y = 300-Math.round(Math.random()*50),
          // foo = (function(){console.log('size:',size)})(),
          group = createSVGGroup(forest.svg,{transform:
            'translate('+x+','+y+')'
          }),
          opts  = {
            maxDepth: Math.round(size/5.5),
            colors: [
              '#531','#531',
              '#452',
              '#471',
              '#392','#392','#392',
            ],
            animDraw: false,
            startX: 0,
            startY: 200-size,
            startLen: 10+size,
            group: group
          };
          // setStyles(group,{visibility:'hidden'});
          trees.groups.push( group );
          trees.positions.push( [x,y] );
          timeline.fractal.init(0,opts);
          // console.log('group:',group);
        },
        startX: 0,
        startY: 0,
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
          if(treeOpts[tkey]===undefined){
            treeOpts[tkey] = this.defaultTreeOpts[tkey];
          }
        }
        if(!treeOpts.group){
          treeOpts.group = createSVGGroup(svgDoc,{transform: 'translate(640,680)'});
        }
        var
        animMs = 0,
        colors = treeOpts.colors,
        animSpeed = treeOpts.animSpeed,
        animStepCalls = treeOpts.animStepCalls,
        animStepFn = treeOpts.animStepFn,
        animDraw = treeOpts.animDraw,
        maxDepth = treeOpts.maxDepth,
        startX = treeOpts.startX,
        startY = treeOpts.startY,
        startLen = treeOpts.startLen,
        startDeg = treeOpts.startDeg,
        isRandom = treeOpts.isRandom,
        paths = [],
        elems = [],
        _anims = [],
        depth = 0,
        degToRad = Math.PI / 180.0,
        group = treeOpts.group,
        drawFract = function(_animProps){
          var
          x = _animProps[0],
          y = _animProps[1],
          x2 = _animProps[2],
          y2 = _animProps[3],
          depth = _animProps[4],
          path = 'M'+x+','+y+' L'+x2+','+y2+' z', color, width,
          color = colors[depth];
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
            if( animDraw ){
              _anims.push( [x,y,x2,y2,depth] );
              setTimeout( function(){
                elems.push( drawFract(_anims.shift()) );
              }, animMs );
            }
            else {
              elems.push( drawFract([x,y,x2,y2,depth]) );
            }
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
          if(animDraw){
            for(var o=0;o<animStepCalls;o++){
              setTimeout( animStepFn, animMs );
            }
          }
          animMs += animSpeed;
          genFract(nextNodes);
        },
        initCoords = [[startX,startY,startLen,startDeg]];
        genFract(initCoords);
        elems.push( group );
        if(!timeline.forest.treeGroup){
          timeline.forest.treeGroup = group;
        }
        return function(){
          setStyles( group, { zIndex: 1000 } );
          // removeElem( group );
        };
      }
    },
