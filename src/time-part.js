var Emitter = require('component-emitter');
var constants = require('./constants');

var TimePart = function(el){
  this.el = el;
  this.amEl = this.el.querySelector('.js-am');
  this.pmEl = this.el.querySelector('.js-pm');
  this.amEl.addEventListener('click', this.click.bind(this, constants.TIME_PARTS.AM));
  this.pmEl.addEventListener('click', this.click.bind(this, constants.TIME_PARTS.PM));
};

TimePart.prototype.click = function(timePart){
  this.value = timePart;
  if(timePart === constants.TIME_PARTS.AM){
    this.amEl.classList.add('timepicker__time--selected');
    this.pmEl.classList.remove('timepicker__time--selected');
  }
  else {
    this.amEl.classList.remove('timepicker__time--selected');
    this.pmEl.classList.add('timepicker__time--selected');
  }
  this.emit('change', this.value);
};

Emitter(TimePart.prototype);
module.exports = TimePart;


