  pupufuck: {
    time: 22000,
    next: 'end',
    init: function(t){
      console.log('fuck.');
      return function(){
        for( i in elems ){
          removeElem(elems[i]);
        }
      };
    }
  },
