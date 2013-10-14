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
