    wait: {
      time: 5000,
      next: 'load',
      init: function(){
        console.log(svgDoc.style.height);
        var
        elem = createElem(b,'div');
        elem.innerHTML = 'click to enter fullscreen!';
        setStyles( elem, {
          position: 'absolute',
          top: 0, left: 0, right: 0,
          color: 'white',
          fontFamily: 'sans-serif',
          height: svgDoc.style.height,
          lineHeight: (parseInt(svgDoc.style.height,10)*0.5)+'px',
          fontSize: (parseInt(svgDoc.style.height,10)*0.25)+'px',
          textAlign: 'center',
          verticalAlign: 'middle'
        } );
        return function(){
          removeElem(elem);
        }
      }
    },
    load: {
      // does the suit and tie thing
      init: function(t){
        var
        _this = this,
        paths = frames.puku[0],
        elems = [],
        anims = [],
        i, path, elem, rusetti, ruAnims = [];
        for( i in paths ){
          path = transSVGPath( paths[i], [ 190, -55 ], 3 );
          elem = createSVGPath( svgDoc, path, '#000', 4 );
          elems.push( elem );
          anims.push( createSVGAnim( elem, t, 1000, 0, 'd',
            offsetSVGPath( path, [ 0, 720 ] )+';'+path+';' ) );
          anims.push( createSVGAnim( elem, t, 6000, 0, 'stroke',
            '#fff;#fff;' ) );
          anims.push( createSVGAnim( elem, t+6000, 1000, 0, 'stroke',
            '#fff;#000;' ) );
        }
        path = transSVGPath( frames.rusetti_still[0][0], [ 480, 210 ], 1 );
        rusetti = createSVGPath( svgDoc, path, '#fff', 4, '#c33' );
        this.rusetti = rusetti;
        this.ruAnims = ruAnims;
        var
        ruPath1 = transSVGPath( path, [ 0, 0 ], 1 );
        ruPath2 = transSVGPath( path, [ -620, -280 ], 2 );
        ruAnims.push( createSVGAnim( rusetti, t+4500, 500, 'indefinite', 'd',
          ruPath1+';'+ruPath2+';'+ruPath1 ) );
        anims.push( createSVGAnim( rusetti, t, 1500, 0, 'd',
          offsetSVGPath( path, [ 0, -600 ] )+';'+path+';' ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+1500, 1000, 0, 0, 30 ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+2500, 2000, 0, 30, -30 ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+4500, 1000, 0, -30, 60 ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+5500, 1000, 0, 60, -90 ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+6500, 500, 0, -90, 90 ) );
        ruAnims.push( createSVGRotAnim( rusetti, t+7000, 1800, 'indefinite', 90, 1170 ) );
        return function(){
          for( i in anims ){ removeElem( anims[i] ); }
          for( i in elems ){ removeElem( elems[i] ); }
        };
      },
      time: 7000,
      next: 'intro'
    },
