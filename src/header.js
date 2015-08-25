var padLeft  = function(nr, n, str){
  return new Array(n - String(nr).length + 1).join(str || '0') + nr;
};
var constants = require('./constants');
var Emitter   = require('component-emitter');
var timePartString = function(timePart){
  return timePart === constants.TIME_PARTS.AM ? 'AM' : 'PM';
};

var Header = function(el){

  var self = this;
  this.el = el;
  this.hours    = this.el.querySelector('.js-current-hour');
  this.minutes  = this.el.querySelector('.js-current-minute');
  this.timePart = this.el.querySelector('.js-current-timepart');

  this.hours.addEventListener('click', function(){
    self.emit('click', constants.TIME_OPTION.TYPE.HOUR);
  });
  this.minutes.addEventListener('click', function(){
    self.emit('click', constants.TIME_OPTION.TYPE.MINUTE);
  });

};

Header.prototype.update = function(time){
  this.hours.innerHTML = time.hours ? padLeft(time.hours, 2) + ':' : '';
  this.minutes.innerHTML = typeof time.minutes === 'number' ? padLeft(time.minutes, 2) : '';
  this.timePart.innerHTML = (time.timePart === constants.TIME_PARTS.AM || time.timePart === constants.TIME_PARTS.PM) ? timePartString(time.timePart) : '';
};

Emitter(Header.prototype);
module.exports = Header;
