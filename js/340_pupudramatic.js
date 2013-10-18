  pupudramatic: {
    next: 'pupurainbow',
    time: 3000,
    trippyG: (function(){
      return createSVGGroup( svgDoc, {
        transform: 'translate(0,0)'
      } );
    })(),
    pupuG: (function(){
      return createSVGGroup( svgDoc, {
        transform: 'translate(0,0)'
      } );
    })(),
    drawTrippyBg: function(t,elems){
      var
      elem = createSVGPath( this.trippyG, 'M0,0 L1280,0 L1280,720 L0,720 z', 'transparent', 0, '#f00' ),
      anim = createSVGAnim( elem, t, 400, 'indefinite', 'fill', '#f00;#0f0;#00f;' );
      elems.push( elem ); elems.push( anim );
    },
    drawPupuDramatic2: function(t,elems){
      var
      pframes = frames.bunny_dramatic,
      paths = [],
      group = this.pupuG,
      elem, anim, i, j, path;
      for( i in pframes[0] ){
        path = scaleSVGPath( pframes[2][i], 2 );
        elem = createSVGPath( group, path, '#000', 16, 'transparent' );
        elems.push( elem );
        paths = [];
        for( j in pframes ){
          paths.push( scaleSVGPath( pframes[j][i], 2 ) );
        }
        for( j in pframes ){
          paths.push( scaleSVGPath( pframes[j][i], 4 ) );
        }
        paths.push( path );
        anim = createSVGAnim( elem, t, 1600, 0, 'd',
          paths.join(';')+';'
        );
        elems.push(anim);
      }
    },
    drawPupuDramatic: function(t,elems){
      var
      pframes = frames.bunny_dramatic[0],
      paths = [],
      group = this.pupuG,
      colors = [
        '#999', // body
        'transparent', // ear&jawline
        '#c00', // eye
        '#c00', // eye
        '#000'
      ],
      elem, anim, i, j, path, color;
      for( i in pframes ){
        color = colors[i];
        path = scaleSVGPath( pframes[i] );
        elem = createSVGPath( group, path, '#000', 16, color );
        elems.push( elem );
        paths = [
          transSVGPath( path, [640,400], 0.5 ),
          transSVGPath( path, [400,200], 2 ),
          transSVGPath( path, [-600,-200], 8 ),
          transSVGPath( path, [-6400,-1600], 40 ),
        ];
        anim = createSVGAnim( elem, t, 800, 6, 'd',
          paths.join(';')+';'
        );
        elems.push(anim);
        if( i==2 || i==3 ){
          anim = createSVGAnim( elem, t, 400, 'indefinite', 'fill', '#0ff;#f0f;#ff0;' );
        }
        elems.push(anim);
      }
    },
    init: function(t,elems){
      var
      elems=[], i,
      _this = this;
      this.drawTrippyBg(t,elems);
      this.drawPupuDramatic(t,elems);
      return function(){
        for( i in elems ){ removeElem( elems[i] ); }
      };
    }
  },
