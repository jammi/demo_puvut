Bunny = (function(){
  var BunnyObj = function(path,x,y,scale){
    console.log('hi');
    this.draw();
  };
  BunnyObj.prototype = {
    draw: function(){
      console.log('draw');
    }
  };
  return BunnyObj;
})(),
