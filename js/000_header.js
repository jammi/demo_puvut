window.addEventListener('load',function(){
  var
  w = window,
  d = window.document,
  b = d.body,
  u = undefined,
  svgNS = 'http://www.w3.org/2000/svg',
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
  createSVG = function(p,rect,viewBox){
    if(!rect){
      rect = [5,5,300,230];
    }
    if(!viewBox){
      viewBox = '0 0 30 23';
    }
    var
    x = rect[0],
    y = rect[1],
    w = rect[2],
    h = rect[3];
    return createElemNS( b, 'svg', svgNS, {
      style: {
        left: x+'px', top: y+'px',
        width: w+'px', height: h+'px'
      },
      xmlns: svgNS,
      viewBox: viewBox,
      preserveAspectRatio: 'xMidYMid slice',
      version: '1.1'
    });
  },
  now = function(){ return new Date().getTime(); };
