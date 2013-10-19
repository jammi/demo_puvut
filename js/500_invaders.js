
  invaders: {
    next: 'end',
    time: 120000,
    treegen: function(t,elems){
      var
      forest = timeline.invaders,
      trees = forest.trees,
      colorsNorm = [
        '#655533','#655533',
        '#452',
        '#471',
        '#392','#392','#392',
      ],
      colorsFire = [
        '#655533',
        '#faff00',
        '#ffe900',
        '#ffac00',
        '#ff5900',
        '#ff2a00',
      ],
      colors, grp, posArr,
      treeComplexity = 4.5;
      if(trees.count < 22){
        colors = colorsNorm;
        grp = trees.norm;
        posArr = trees.normPos;
      }
      else if(trees.count < 44){
        colors = colorsFire;
        grp = trees.fire;
        posArr = trees.firePos;
        treeComplexity = 5.5;
      }
      else {
        clearTimeout(timeline.invaders.treegenInterval);
        return;
      }
      trees.count += 1;
      var
      size  = Math.round(Math.random()*10)+20,
      x = (grp.length*75-size),
      y = Math.round(Math.random()*50),
      // foo = (function(){console.log('size:',size)})(),
      group = createSVGGroup(forest.treeG,{transform:
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
      console.log('invaders');
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
    init: function(t){
      var
      spaceG = createSVGGroup( svgDoc, { transform: 'translate(0,0)' } ),
      treeG = createSVGGroup( svgDoc, { transform: 'translate(0,100)' } ),
      pupuG = createSVGGroup( svgDoc, { transform: 'translate(300,250)' } ),
      frontG = createSVGGroup( svgDoc, { transform: 'translate(0,500)' } ),
      elems = [], i, paths, path, elem, anim, _this = this;

      this.drawPuput(t,elems,pupuG);

      this.treeG = treeG;
      setSVGAttrs( treeG, {
        transform: 'translate(-6000,0)'
      });
      createSVGMoveAnim( treeG, t, 120000, 0, '0,0', '-60000,0' );
      _this.treegenInterval = setInterval( function(){
        _this.treegen( Math.round(svgDoc.getCurrentTime()*1000), elems )
      }, 10 );

      return function(){
        for( i in elems ){
          removeElem( elems[i] );
        }
      }
    }
  },
