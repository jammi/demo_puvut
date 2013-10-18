    // add text and stuff here, while the tie is spinning
    intro: {
      init: function(t){
        var
        _init = prevItem,
        i,
        rusetti = _init.rusetti,
        ruPath  = _init.ruPath,
        ruAnims = _init.ruAnims,
        elems = [];

        return function(){
          for( i in ruAnims ){ removeElem( ruAnims[i] ); }
          for( i in elems ){ removeElem( elems[i] ); }
          removeElem( rusetti );
        };
      },
      time: 21000,
      next: 'plant'
    },
