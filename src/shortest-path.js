
var ShortestPath = function(){
  this.path = {
    degree: 0,
    index: 0
  };
};

ShortestPath.prototype.find = function(target){
  target = target === 12 ? 0 : target;
  var current = this.path.index;
  var pos = target - current;
  pos = pos < 0 ? pos + 12 : pos;
  var neg = (12 - target) + current;
  neg = neg > 12 ? neg - 12 : neg;
  if(pos < neg){
    this.path.degree = this.path.degree + pos * 30;
  }
  else {
    this.path.degree = this.path.degree -(neg * 30);
  }
  this.path.index = target;
  return this.path.degree;
};

module.exports = ShortestPath;

