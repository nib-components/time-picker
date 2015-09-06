
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
  var neg = (12 - target) + current;
  this.path.index = target;
  if(pos < neg){
    this.path.degree = this.path.degree + pos * 30;
  }
  else {
    this.path.degree = -(neg * 30);
  }
  return this.path.degree;
};

module.exports = ShortestPath;

