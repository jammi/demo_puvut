(function(){
window.addEventListener('load',function(){
  var
  w = window,
  isInFullScreen = false,
  _resizer = w.addEventListener('resize',function(){
    if(isInFullScreen){return;}
    window.removeEventListener(_resizer);
    setTimeout( function(){window.location.reload(true);}, 500 );
  }),
  d = window.document,
  b = d.body,
  u = undefined,
  svgNS = 'http://www.w3.org/2000/svg',
  now = function(){ return new Date().getTime(); },
