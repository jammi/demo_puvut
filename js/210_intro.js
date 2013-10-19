    // add text and stuff here, while the tie is spinning
    intro: {
      text: "Huhuu presents PUVUT ☮ Credits ~\
        jammi: code ☈ ainu: graphics ☀ frank_one: music ☁",
      grp: (function(){
        return createSVGGroup( svgDoc, {
          transform: 'translate(0,0)'
        } );
      })(),
      init: function(t){
        var
        _init = prevItem,
        i,
        rusetti = _init.rusetti,
        ruPath  = _init.ruPath,
        ruAnims = _init.ruAnims,
        elems = [];
        drawTextScroller( t, elems, this.grp, frames.creditspath[0][0], this.text, 1500, -4500, 22000, {
          stroke: '#fff',
          fill: '#000',
          'font-size': 100,
          'font-family': 'sans-serif',
          'stroke-width': 4
        } );
        return function(){
          for( i in ruAnims ){ removeElem( ruAnims[i] ); }
          for( i in elems ){ removeElem( elems[i] ); }
          removeElem( rusetti );
        };
      },
      time: 21000,
      next: 'plant'
    },
