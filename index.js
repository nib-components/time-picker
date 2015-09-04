var template     = require('./src/template.html');
var Emitter      = require('component-emitter');
var Validator    = require('./src/validator');
var AmPmPicker   = require('./src/ampm-picker');
var HourPicker   = require('./src/hour-picker');
var MinutePicker = require('./src/minute-picker');

/**
 * @module time-picker
 * @class TimePicker
 * @param options {{el: Element, valid: TimeRange|function}}
 * @constructor
 */
var TimePicker = function (options){
  var self = this;

  this.el           = options.el;
  this.el.innerHTML = template;
  var validator = options.valid ? new Validator(options.valid) : null;

  this.handEl   = this.el.querySelector('.js-hand');
  this.handContainer = this.el.querySelector('.js-hand-container');
  var amPmEl    = this.el.querySelector('.js-timepicker-states__ampm');
  var hoursEl   = this.el.querySelector('.js-timepicker-states__hours');
  var minutesEl = this.el.querySelector('.js-timepicker-states__minutes');
  this.amPm     = new AmPmPicker(amPmEl);
  this.hours    = new HourPicker(hoursEl, validator);
  this.minutes  = new MinutePicker(minutesEl, validator);

  this.amPm.on('change', function(value){
    self.reset();
    self.renderHours();
    self.emit('change', self.getTime());
    self.emit('change:amPm', value);
  });

  this.hours.on('change', function(value){
    self.minutes.reset();
    self.minutes.value = null;
    self.renderMinutes();
    self.emit('change', self.getTime());
    self.emit('change:hour', value);
  });

  this.minutes.on('change', function(value){
    self.setHand((value / 5) || 12);
    self.emit('change', self.getTime());
    self.emit('change:minute', value);
  });

  this.amPm.show();
};

/**
 * renders the starting state
 * @private
 * @function renderStart
 */
TimePicker.prototype.renderStart = function(){
  this.handContainer.classList.add('is-hidden');
  this.minutes.hide();
  this.hours.hide();
  this.amPm.show();
};

/**
 * renders the hours clock
 * @private
 * @function renderHours
 */
TimePicker.prototype.renderHours = function(){
  this.handContainer.classList.remove('is-hidden');
  this.minutes.hide();
  this.amPm.hide();
  this.hours.show(this.amPm.value);
  if(typeof this.hours.value === 'number' && this.hours.value > -1) {
    this.setHand(this.hours.value);
  }
  else if(this.hours.validator){
    this.setHand(this.hours.validator.firstHour(this.amPm.value).hour);
  }
  else {
    this.setHand(12);
  }
};

/**
 * renders the minutes clock
 * @private
 * @function renderMinutes
 */
TimePicker.prototype.renderMinutes = function(){
  this.handContainer.classList.remove('is-hidden');
  this.hours.hide();
  this.amPm.hide();
  this.minutes.show(this.hours.value, this.amPm.value);
  if(typeof this.minutes.value === 'number' && this.minutes.value > -1) {
    this.setHand((this.minutes.value / 5) || 12);
  }
  else if(this.minutes.validator){
    this.setHand((this.minutes.validator.firstMinute(this.hours.value, this.amPm.value).minute / 5) || 12);
  }
  else {
    this.setHand(12);
  }
};

/**
 * @public
 * @type {Function}
 * @method show - shows the time picker in its initial state
 */
TimePicker.prototype.show = TimePicker.prototype.renderStart;


/**
 * returns whether or not a user has fully completed entering a time
 * @public
 * @type {Function}
 * @returns {Boolean}
 */
TimePicker.prototype.hasTime = function(){
  return ((typeof this.amPm.value === 'number' && this.amPm.value > -1) && !!this.hours.value && !!this.minutes.value);
};

/**
 * updates the time picker with a new valid time range
 * @public
 * @type {Function}
 * @param valid - the new time range for validation
 */
TimePicker.prototype.updateValid = function(valid){
  var validator = new Validator(valid);
  this.hours.validator = validator;
  this.minutes.validator = validator;
};


/**
 * returns the currently selected time
 * @public
 * @type {Function}
 * @returns {{hours: Number, minutes: Number, amPm: Number}}
 */
TimePicker.prototype.getTime = function(){
  return {
    hours: this.hours.value,
    minutes: this.minutes.value,
    amPm: this.amPm.value
  };
};

// TODO shortest path algorithm
//TimePicker.prototype.getHand = function(time){
//
//};

TimePicker.prototype.setHand = function(time){
  this.resetHand();
  this.handEl.style.transform = 'rotate(' + time * 30 + 'deg)';
};

/**
 * resets the minute/hour values and their selected state
 * @private
 * @type {Function}
 */
TimePicker.prototype.reset = function(){
  this.hours.reset();
  this.hours.value = null;
  this.minutes.reset();
  this.minutes.value = null;
  this.setHand(12);
  this.emit('change', this.getTime());
};

/**
 * @alias TimeRange
 */
TimePicker.TimeRange = require('./src/time-range');
Emitter(TimePicker.prototype);
module.exports = TimePicker;
