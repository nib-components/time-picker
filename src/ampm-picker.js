var Emitter = require('component-emitter');
var constants = require('./constants');

var AmPmPicker = function(el){
  this.el = el;
  this.amEl = this.el.querySelector('.js-am');
  this.pmEl = this.el.querySelector('.js-pm');
  this.amEl.addEventListener('click', this.click.bind(this, constants.TIME_PARTS.AM));
  this.pmEl.addEventListener('click', this.click.bind(this, constants.TIME_PARTS.PM));
};

AmPmPicker.prototype.click = function(timePart){
  this.value = timePart;
  this.emit('change', this.value);
};

AmPmPicker.prototype.show = function(){
  this.el.classList.remove('is-hidden');
};

AmPmPicker.prototype.hide = function(){
  this.el.classList.add('is-hidden');
};

Emitter(AmPmPicker.prototype);
module.exports = AmPmPicker;