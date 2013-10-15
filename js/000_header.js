(function(){
  var _resizer = window.addEventListener('resize',function(){
    window.removeEventListener(_resizer);
    setTimeout( function(){window.location.reload(true);}, 500 );
  });
window.addEventListener('load',function(){
  var
  w = window,
  d = window.document,
  b = d.body,
  u = undefined,
  svgNS = 'http://www.w3.org/2000/svg',
  now = function(){ return new Date().getTime(); },
