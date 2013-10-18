    // add text and stuff here, while the tie is spinning
    intro: {
      text: "Huhuu presents PUVUT ☮ Credits ~\
        jammi: code ☈ ainu: graphics ☀ frank_one: music ☁\
        Please enjoy your stay at AltParty2013! kthxbai <83",
      grp: (function(){
        return createSVGGroup( svgDoc, {
          transform: 'translate(0,0)'
        } );
      })(),
      init: function(t){
        var
        textStart = 1500,
        textEnd  = -6500,
        _init = prevItem,
        i,
        rusetti = _init.rusetti,
        ruPath  = _init.ruPath,
        ruAnims = _init.ruAnims,
        elems = [],
        grp = this.grp,
        text = this.text,
        creditsPath = frames.creditspath[0][0],
        defs = createElemNS( grp, 'defs', svgNS ),
        waves = createElemNS( grp, 'path', svgNS, {
          d: creditsPath,
          id: 'txtpath',
          fill: 'transparent'
        } ),
        textElem = createElemNS( grp, 'text', svgNS, {
          stroke: '#fff',
          fill: '#000',
          'font-size': 100,
          'font-family': 'sans-serif',
          'stroke-width': 4
        } ),
        textPath = createElemNS( textElem, 'textPath', svgNS, {
          id: 'introtext',
          startOffset: textStart
        } );
        textPath.setAttributeNS( xlinkNS, 'xlink:href', '#txtpath' );
        textPath.textContent = text;
        var
        anim = createElemNS( textPath, 'animate', svgNS, {
          attributeName: 'startOffset',
          from: textStart,
          to: textEnd,
          begin: t+'ms',
          dur: '22000ms',
          repeatCount: 0
        } );
        anim.setAttributeNS( xlinkNS, 'xlink:href', '#introtext' );
        elems.push(defs);
        elems.push(waves);
        elems.push(textElem);
        elems.push(textPath);
        elems.push(anim);
        return function(){
          for( i in ruAnims ){ removeElem( ruAnims[i] ); }
          for( i in elems ){ removeElem( elems[i] ); }
          removeElem( rusetti );
        };
      },
      time: 21000,
      next: 'plant'
    },
