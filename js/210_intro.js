    // add text and stuff here, while the tie is spinning
    intro: {
      init: function(t){
        var
        _init = prevItem,
        i,
        rusetti = _init.rusetti,
        ruPath  = _init.ruPath,
        ruAnims = _init.ruAnims;
        return function(){
          for( i in ruAnims ){ removeElem( ruAnims[i] ); }
          removeElem( rusetti );
        };
      },
      time: 20000,
      next: 'plant'
    },
