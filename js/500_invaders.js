
  invaders: {
    next: 'end',
    time: 30000,
    treeMove: function(){
      var
      _this = timeline.invaders,
      trees = _this.trees,
      norm = trees.norm,
      normPos = trees.normPos,
      posDiffX = (normPos[21][0]-normPos[0][0])+75,
      grp = norm.shift(),
      xy = normPos.shift(),
      x = xy[0]+posDiffX,
      y = xy[1];
      normPos.push([x,y]);
      norm.push(grp);
      setSVGAttrs( grp, {
        transform: 'translate('+x+','+y+')'
      } );
    },
    fireMove: function(){
      var
      _this = timeline.invaders,
      trees = _this.trees,
      fire = trees.fire,
      firePos = trees.firePos,
      posDiffX = (firePos[21][0]-firePos[0][0])+75,
      grp = fire.shift(),
      xy = firePos.shift(),
      x = xy[0]+posDiffX,
      y = xy[1];
      firePos.push([x,y]);
      fire.push(grp);
      setSVGAttrs( grp, {
        transform: 'translate('+x+','+y+')'
      } );
    },
    treegen: function(t,elems){
      var
      _this = timeline.invaders,
      trees = _this.trees,
      typeSize = 1800,
      colorsNorm = [
        '#655533','#655533',
        '#452',
        '#471',
        '#392','#392','#392',
      ],
      colorsFire = [
        'transparent',
        '#faff00',
        '#ffe900',
        '#ffac00',
        '#ff5900',
        '#ff2a00',
      ],
      colors, grp, posArr,
      treeComplexity = 4.5;
      if(trees.count < 22){
        colors = colorsFire;
        grp = trees.fire;
        posArr = trees.firePos;
        treeComplexity = 5.5;
      }
      else if(trees.count < 44){
        colors = colorsNorm;
        grp = trees.norm;
        posArr = trees.normPos;
        typeSize = 150;
      }
      else {
        clearTimeout(_this.treeInterval);
        _this.treeInterval = setInterval(_this.treeMove,134);
        _this.treeIntervalF = setInterval(_this.fireMove,124);
        createSVGMoveAnim( _this.treeG, t, 120000, 0, '0,0', '-60000,0' );
        return;
      }
      trees.count += 1;
      var
      size  = Math.round(Math.random()*10)+20,
      x = (grp.length*75)-typeSize,
      y = Math.round(Math.random()*50),
      // foo = (function(){console.log('size:',size)})(),
      group = createSVGGroup(_this.treeG,{transform:
        'translate('+x+','+y+')'
      }),
      opts  = {
        maxDepth: Math.round(size/treeComplexity),
        colors: colors,
        animDraw: false,
        startX: 0,
        startY: 200-size,
        startLen: 10+size,
        group: group
      };
      // setStyles(group,{visibility:'hidden'});
      grp.push( group );
      posArr.push( [x,y] );
      timeline.fractal.init(0,opts);
      // console.log('group:',group);
    },
    trees: {
      count: 0,
      norm: [],
      fire: [],
      normPos: [],
      firePos: []
    },
    drawPuput: function(t,elems,group){
      var
      scales = [
        0.25, 0.33, 0.59, 0.78, 1.0, 1.38
      ],
      colors = [
        '#ee70ff',
        '#ff729d',
        '#ffa56f',
        '#ffed77',
        '#b0ff69',
        '#5fffbf'
      ],
      paths = frames.bunny_leap,
      apath, path, elem, anim, move, j=0,
      tops = [ 50, 75, 113, 169, 253, 380 ],
      top;
      for( ; j < 6; j++ ){
        apath = [];
        color = colors[j];
        scale = scales[j];
        top = tops[j];
        for( i in paths ){
          path = transSVGPath( paths[i][0], [j*20,top*0.3], scale );
          path = horizFlipSVGPath( path );
          apath.push( path );
        }
        elem = createSVGPath( group, apath[0], '#fff', j, color );
        // move = createSVGMoveAnim( elem, t, 2200, 0, '-400,'+top, '1800,'+top );
        anim = createSVGAnim( elem, t+(j*100), 600-(j*10), 'indefinite', 'd', apath.join(';')+';' );
        elems.push(elem);
         // elems.push(move);
        elems.push(anim);
      }
    },
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit,\
           sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna \
           aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud \
           exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea \
           commodo consequat. Duis autem vel eum iriure dolor in hendrerit in \
           vulputate velit esse molestie consequat, vel illum dolore eu feugiat \
           nulla facilisis at vero eros et accumsan et iusto odio dignissim qui \
           blandit praesent luptatum zzril delenit augue duis dolore te feugait',
    drawTextScroller: function(t,elems,grp){
      var
      creditsPath = frames.creditspath_end,
      text = this.text,

      // tweak these after changing text:
      textStart = 1500,
      textEnd = -6500,

      dur = 25000,
      textStyle = {
        stroke: '#fff',
        fill: '#000',
        'font-size': 100,
        'font-family': 'sans-serif',
        'stroke-width': 4
      };
      drawTextScroller( t, elems, grp, creditsPath, text, textStart, textEnd, dur, textStyle );
    },
    init: function(t){
      var
      spaceG = createSVGGroup( svgDoc, { transform: 'translate(0,0)' } ),
      treeG  = createSVGGroup( svgDoc, { transform: 'translate(0,100)' } ),
      pupuG  = createSVGGroup( svgDoc, { transform: 'translate(300,250)' } ),
      frontG = createSVGGroup( svgDoc, { transform: 'translate(0,0)' } ),
      elems  = [], i, paths, path, elem, anim, _this = this;

      this.drawPuput(t,elems,pupuG);
      this.drawTextScroller( t, elems, frontG );

      this.treeG = treeG;
      setSVGAttrs( treeG, {
        transform: 'translate(-6000,0)'
      });
      _this.treeInterval = setInterval( function(){
        _this.treegen( Math.round(svgDoc.getCurrentTime()*1000), elems )
      }, 20 );

      return function(){
        setSVGAttrs( pupuG, {
          transform: 'translate(6000,-2000)'
        });
        elems.push(
          createSVGMoveAnim( pupuG, Math.round(svgDoc.getCurrentTime()*1000), 4000, 0, '300,250', '2000,250' )
        );
        elems.push(pupuG);
        elems.push(treeG);
        clearTimeout(_this.treeInterval);
        clearTimeout(_this.treeIntervalF);
        setTimeout(function(){
          for( i in elems ){
            removeElem( elems[i] );
          }
        }, 5000 );
      }
    }
  },
