var TimeOption = require('./time-option');
var Emitter    = require('component-emitter');
var constants  = require('./constants');

var HourPicker = function(el, validator){
  this.el = el;
  this.validator = validator;
  this.hours = [];
  this.el.innerHTML = '';

  for(var i = 0; i < 12; i++) {
    // create hour buttons
    var hr = new TimeOption({
      value: i + 1,
      type: constants.TIME_OPTION.TYPE.HOUR
    });
    hr.el.addEventListener('click', this.click.bind(this, hr));
    this.el.appendChild(hr.el);
    this.hours.push(hr);
  }
};

HourPicker.prototype.show = function (timePart){
  for(var i = 0; i < this.hours.length; i++){
    var hr = this.hours[i];
    hr.setEnabled(this.validator ? this.validator.validateHour(hr, timePart) : true);
  }
  this.el.classList.remove('is-hidden');
};

HourPicker.prototype.hide = function (){
  this.el.classList.add('is-hidden');
};

HourPicker.prototype.reset = function(){
  for(var i = 0; i < this.hours.length; i++){
    this.hours[i].el.classList.remove('timepicker__hours--selected');
  }
};

HourPicker.prototype.click = function(hr){
  if(hr.isEnabled){
    this.value = hr.value;
    this.reset();
    hr.el.classList.add('timepicker__hours--selected');
    this.emit('change', this.value);
  }
};

Emitter(HourPicker.prototype);
module.exports = HourPicker;

