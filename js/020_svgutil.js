  createSVG = function(p,rect,viewBox,allowFullScreen){
    if(!rect){
      rect = [0,0,320,320];
    }
    if(!viewBox){
      viewBox = '0 0 320 320';
    }
    var
    x = rect[0],
    y = rect[1],
    w = rect[2],
    h = rect[3],
    elem = createElemNS( b, 'svg', svgNS, {
      style: {
        left: x+'px', top: y+'px',
        width: w+'px', height: h+'px'
      },
      xmlns: svgNS,
      'xmlns:xlink': xlinkNS,
      viewBox: viewBox,
      preserveAspectRatio: 'xMidYMid slice',
      version: '1.1',
      allowFullScreen: allowFullScreen
    });
    if( allowFullScreen ){
      document.body.addEventListener('click',function(){
        // window.removeEventListener(_resizer);
        setTimeout(function(){
          var
          rect = svgRectFn(),
          x = rect[0],
          y = rect[1],
          w = rect[2],
          h = rect[3];
          setStyles( elem, {
            left: x+'px', top: y+'px',
            width: w+'px', height: h+'px',
            backgroundColor: '#000'
          } );
          isInFullScreen = false;
          console.log(rect);
        }, 200 );
        if(!isInFullScreen){
          isInFullScreen = true;
          if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
          }
          else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
          }
          else if (elem.requestFullScreen) {
            elem.requestFullScreen();
          }
        }
      });
    }
    return elem;
  },
  svgPathMatch = {
    instr: /([a-zA-Z])([\-0-9]+?),([0-9]+?)/,
    coord: /([0-9]+?),([\-0-9]+?)/
  },
  _processSVGCoords = function( path, fn ){
    var
    scalePath = [],
    splitPath = path.split(' '),
    chr, instr, coords, i, x, y;
    for( i in splitPath ){
      instr = splitPath[i];
      if( instr == 'z' ){
        scalePath.push( instr );
      }
      else if( svgPathMatch.instr.test( instr ) ){
        chr = instr[0];
        coords = instr.slice(1).split(',');
        scalePath.push( chr+fn(parseInt(coords[0],10),parseInt(coords[1]),10) );
      }
      else if( svgPathMatch.coord.test( instr ) ){
        coords = instr.split(',');
        scalePath.push( fn(parseInt(coords[0],10),parseInt(coords[1],10)) );
      }
      else{
        console.warn('undefined instr:',instr);
      }
    }
    return scalePath.join(' ');
  },
  transSVGPath = function( path, offset, scale ){
    if(!offset){ offset = [0,0]; }
    if(!scale){  scale  = 1.0; }
    var
    offsetX = offset[0],
    offsetY = offset[1];
    return _processSVGCoords( path, function(x,y){
      x = Math.round( parseInt(x)*scale ) + offsetX;
      y = Math.round( parseInt(y)*scale ) + offsetY;
      return x.toString()+','+y.toString();
    });
  },
  horizFlipSVGPath = function(path,w){
    if(!w){ w=320; }
    var _out = _processSVGCoords( path, function(x,y){
      x = w-x;
      return x.toString()+','+y.toString();
    } );
    return _out;
  },
  scaleSVGPath = function( path, scale ){
    return transSVGPath( path, null, scale );
  },
  offsetSVGPath = function( path, offset ){
    return transSVGPath( path, offset, null );
  },
  svgRectFn = function(){
    var
    rect = [ 0,0,640,360 ],
    w = window.innerWidth,
    h = window.innerHeight,
    asp = Math.round(w/h*10);
    if( asp < 18 ){
      rect[2] = w;
      rect[3] = Math.round( w/1.777 );
    }
    else {
      rect[2] = Math.round( h*1.777 );
      rect[3] = h;
    }
    return rect;
  },
  svgRect = svgRectFn(),
  createSVGAnim = function( elem, begin, dur, repeat, attr, values ){
    return createElemNS( elem, 'animate', svgNS, {
      begin: begin+'ms',
      dur: dur+'ms',
      repeatCount: repeat,
      attributeName: attr,
      values: values
    } );
  },
  setSVGAttrs = function( elem, attrs ){
    // setAttrsNS( elem, attrs, svgNS );
    for( var i in attrs ){
      elem.setAttributeNS( null, i, attrs[i] );
    }
  },
  createSVGRotAnim = function( parent, begin, dur, repeat, deg0, deg1, x, y ){
    var parBB = parent.getBBox();
    if( x == null ){ x = parBB.x+parBB.width/2 }
    if( y == null ){ y = parBB.y+parBB.height/2 }
    return createElemNS( parent, 'animateTransform', svgNS, {
      attributeName: 'transform',
      attributeType: 'XML',
      type: 'rotate',
      begin: begin+'ms',
      dur: dur+'ms',
      repeatCount: repeat,
      from: deg0+' '+x+' '+y,
      to: deg1+' '+x+' '+y
    } );
  },
  createSVGScaleAnim = function( parent, begin, dur, repeat, scale0, scale1 ){
    var
    parBB = parent.getBBox(),
    x = parBB.x+parBB.width/2,
    y = parBB.y+parBB.height/2;
    return createElemNS( parent, 'animateTransform', svgNS, {
      attributeName: 'transform',
      attributeType: 'XML',
      type: 'scale',
      begin: begin+'ms',
      dur: dur+'ms',
      repeatCount: repeat,
      from: scale0,
      to: scale1
    } );
  },
  createSVGMoveAnim = function( parent, begin, dur, repeat, from, to ){
    return createElemNS( parent, 'animateTransform', svgNS, {
      attributeName: 'transform',
      attributeType: 'XML',
      type: 'translate',
      begin: begin+'ms',
      dur: dur+'ms',
      repeatCount: repeat,
      from: from,
      to: to
    } );
  },
  createSVGPath = function( parent, path, stroke, strokeWidth, fill ){
    var attr = {
      d: path,
      'stroke-linecap': 'round'
    };
    if( stroke != null ){ attr.stroke = stroke; }
    if( strokeWidth != null ){ attr['stroke-width'] = strokeWidth; }
    if( fill != null ){ attr.fill = fill }
    return createElemNS( parent, 'path', svgNS, attr );
  },
  createSVGGroup = function( parent, attr ){
    return createElemNS( parent, 'g', svgNS, attr );
  },
  createSVGGroup2 = function( parent, attr ){
    return createElemNS( parent, 'svg', svgNS, attr );
  },
