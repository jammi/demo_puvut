(function(){
window.addEventListener('load',function(){
  var
  devel = false, // enable debug texts
  next = 'wait',
  skipTo = false,
  // skipTo = 'load',
  // skipTo = 'plant3',
  // skipTo = 'fractal',
  // skipTo = 'pupumush',
  // skipTo = 'pupudramatic',
  // skipTo = 'invaders',
  origSkip = skipTo,
  w = window,
  isInFullScreen = false,
  _resizer = w.addEventListener('resize',function(){
    if(isInFullScreen){return;}
    window.removeEventListener('resize',_resizer);
    setTimeout( function(){window.location.reload(true);}, 500 );
  }),
  d = window.document,
  b = d.body,
  u = undefined,
  svgNS = 'http://www.w3.org/2000/svg',
  xlinkNS = 'http://www.w3.org/1999/xlink',
  now = function(){ return new Date().getTime(); },
