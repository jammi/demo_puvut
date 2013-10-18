  forest: {
    time: 30000,
    next: 'pupumush',
    svg: (function(){
      setTimeout( function(){
        timeline.forest.svg = createSVGGroup(svgDoc,{
          transform:
            'translate(0,0)'
        });
        timeline.forest.svg2 = createSVGGroup(svgDoc,{
          transform:
            'translate(0,0)'
        });
      }, 0 );
    })(),
    trees: {
      groups: [],
      positions: []
    },
    bunnyThings: function(t){
      console.log('bunnyThings:',this.svg2);
    },
    init: function(t){
      var
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
      fractalGroup = this.treeGroup;
      setTimeout(function(){_this.bunnyThings(t)},10);
      anims.push(
        createSVGMoveAnim( fractalGroup, t, 12000, 0, '640,680', '-1280,680' )
      );
      setTimeout(function(){removeElem(fractalGroup);},8500);
      setSVGAttrs( this.svg, {
        transform: 'translate(-7000,0)'
      });
      anims.push(
        createSVGMoveAnim( this.svg, t, 30000, 0, '0,0', '-7000,0' )
      );
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
