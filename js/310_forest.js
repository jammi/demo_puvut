  forest: {
    time: 30000,
    next: 'pupumush',
    svg: (function(){
      setTimeout( function(){
        timeline.forest.svg = createSVGGroup(svgDoc,{
          transform: 'translate(0,0)'
        });
        timeline.forest.svg2 = createSVGGroup(svgDoc,{
          transform: 'translate(0,0)'
        });
        timeline.forest.svg3 = createSVGGroup(timeline.forest.svg2,{
          transform: 'translate(5800,0)'
        });
        setStyles(timeline.forest.svg3,{visibility:'hidden'})
      }, 0 );
    })(),
    trees: {
      groups: [],
      positions: []
    },
    staticThings: function(t,elems){
      var
      parent = this.svg3,
      taikasieni = frames.pikkusieni_lives,
      i, path,
      taika = createSVGGroup( parent, {
        transform: 'translate(700,480)'
      } );
      taikasieniPaths = [];
      for( i in taikasieni ){
        path = taikasieni[i][0];
        taikasieniPaths.push(horizFlipSVGPath(path));
      }
      this.taikaPaths = taikasieniPaths;
      this.taikaGroup = taika;
      this.taika = createSVGPath( taika, taikasieniPaths[0], '#00f', 4, '#66f' );
      this.taikaAnim = createSVGAnim( this.taika, t, 500, 'indefinite', 'stroke', [
        '#0f0',
        '#f00',
        '#00f'
      ].join(';')+';' );
      this.taikaAnim2 = createSVGAnim( this.taika, t, 600, 'indefinite', 'fill', [
        '#00f',
        '#0f0',
        '#f00'
      ].join(';')+';' );
    },
    bunnyThings: function(t){
      var
      elems = [],
      parent = this.svg2,
      kiviPos = [ 0, 0 ],
      kiviScale = 0.5,
      colors = [
        // line    fill
        [[ '#999', '#999' ]], // kivi1
        [[ '#bbb', '#888' ]], // kivi2
        [[ '#999', '#aaa' ]], // kivi3
        [[ '#804945', '#82563E' ],[ '#82563E', '#865940' ]], // pikkusieni
        [[ '#fc0', '#960' ]], // kanttis
        [[ '#7B6333','#806635']], //iso_sieni
        [[ '#fc0', '#960' ]], // rev_kanttis
        [[ '#0f0', '#292' ],[ '#0f0', '#2c2' ]], // taimi
        [[ '#0f0', '#292' ],[ '#0f0', '#2c2' ]], // taimi2
        [[ '#fff', '#999' ]], // bunny_ihme
        [[ '#fff', '#999' ]], // bunny_hoptoass
        [[ '#fff', '#999' ]], // rev_bunny_ihme
        [[ '#fff', '#999' ]], // rev_bunny_hoptoass
      ],
      kivet = [
        frames.kivi1[0][0], frames.kivi2[0][0], frames.kivi3[0][0],
        frames.pikkusieni[0][0],
        frames.kanttis[0][0],
        frames.iso_sieni[0][0],
        horizFlipSVGPath( frames.kanttis[0][0] ),
        transSVGPath( frames.taimi[2][0], kiviPos, kiviScale ),
        transSVGPath( frames.taimi2[0][0], kiviPos, kiviScale ),

        transSVGPath( frames.bunny_ihme[3][0], kiviPos, 0.7 ),
        transSVGPath( frames.bunny_hoptoass[0][0], kiviPos, 0.7 ),
        horizFlipSVGPath( transSVGPath( frames.bunny_ihme[3][0], kiviPos, 0.7 )),
        horizFlipSVGPath( transSVGPath( frames.bunny_hoptoass[0][0], kiviPos, 0.7 )),
      ],i,j,grp,x=1300,y,kivi,color,
      kiviLen = kivet.length;
      for( ; x<4800; ){
        j = Math.floor(Math.random()*(kiviLen-4));
        if( j == kiviLen-5 ){
          j += Math.floor(Math.random()*4);
        }
        x += Math.floor(Math.random()*180)+80; // "kivien" tiheys
        y = 480+Math.floor(Math.random()*30)-15;
        grp = createSVGGroup(parent,{transform: 'translate('+x+','+y+')' });
        color = colors[j];
        color = color[Math.floor(Math.random()*color.length)];
        kivi = transSVGPath( kivet[j], kiviPos, Math.random()*1.2 );
        elems.push( createSVGPath( grp, kivi, color[0], 2, color[1] ) );
      }
      this.staticThings( t, elems );
      return elems;
    },
    init: function(t){
      var
      // scrollTime = (origSkip=='fractal')?5000:30000,
      scrollTime = 30000,
      _this = this,
      trees = this.trees,
      positions = trees.positions,
      groups = trees.groups,
      i, tree, pos, x, xs = [], to = 7000,
      posI,
      posLen = positions.length,
      posDiffX = positions[posLen-1][0]-positions[0][0],
      anims = [],
      forestMoves = [],
      elems = this.bunnyThings(t),
      fractalGroup = this.treeGroup;
      setTimeout(function(){
        setStyles(timeline.forest.svg3,{visibility:'visible'});
      }, 15000 );
      anims.push(
        createSVGMoveAnim( fractalGroup, t, 12000, 0, '640,680', '-1280,680' )
      );
      setTimeout(function(){removeElem(fractalGroup);},8500);
      setSVGAttrs( this.svg, {
        transform: 'translate(-7000,0)'
      });
      anims.push(
        createSVGMoveAnim( this.svg, t, scrollTime, 0, '0,0', '-7000,0' )
      );
      setSVGAttrs( this.svg2, {
        transform: 'translate(-6000,0)'
      });
      anims.push(
        createSVGMoveAnim( this.svg2, t, scrollTime, 0, '0,0', '-6000,0' )
      );
      setTimeout( function(){
        timeline.pupurun.init(
          Math.round(svgDoc.getCurrentTime()*1000),
          true, 460
        )
      }, 25000 );
      for(i=0;i<76;i++){
        to += 300;
        posI = i%posLen;
        pos = positions[posI];
        pos[0] += posDiffX;
        forestMoves.push( [ groups[posI], pos[0], pos[1] ] );
        setTimeout( function(){
          var
          gPosXY = forestMoves.shift(),
          grp = gPosXY[0],
          x = gPosXY[1],
          y = gPosXY[2];
          setSVGAttrs( grp, {
            transform: 'translate('+x+','+y+')'
          } );
        }, to );
      }
      return function(){
        for( i in anims ){
          removeElem( anims[i] );
        }
      };
    }
  },
