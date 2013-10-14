  setStyles = function(e,style){
    for( var k in style ){
      e.style[k] = style[k];
    }
  },
  setAttrs = function(e,attrs){
    for( var k in attrs ){
      if( k === 'style' ){ continue; }
      v = attrs[k];
      e.setAttribute( k, v )
    }
    if( attrs.style ){
      setStyles( e, attrs.style );
    }
  },
  createElem = function(p,type,attrs){
    if( p === u ){ p = b; }
    if( type === u ){ type = 'div'; }
    var e = d.createElement(type);
    if( attrs !== u ){
      setAttrs(e,attrs);
    }
    p.appendChild( e );
    return e;
  },
  createElemNS = function(p,type,ns,attrs){
    if( p === u ){ p = b; }
    if( type === u ){ type = 'div'; }
    var e = d.createElementNS(ns,type);
    if( attrs !== u ){
      setAttrs(e,attrs);
    }
    p.appendChild( e );
    return e;
  },
  removeElem = function(elem){
    elem.parentNode.removeChild(elem);
  },
