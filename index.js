var template     = require('./src/template.html');
var Emitter      = require('component-emitter');
var Validator    = require('./src/validator');
var Header       = require('./src/header');
var TimePart     = require('./src/time-part');
var HourPicker   = require('./src/hour-picker');
var MinutePicker = require('./src/minute-picker');
var constants    = require('./src/constants');

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
  this.clockFace    = this.el.querySelector('.js-clockface');
  this.timePart     = new TimePart(this.el);
  this.header       = new Header(this.el);

  var validator = options.valid ? new Validator(options.valid) : null;
  var hoursEl   = this.el.querySelector('.js-timepicker-states__hours');
  var minutesEl = this.el.querySelector('.js-timepicker-states__minutes');
  this.hours    = new HourPicker(hoursEl, validator);
  this.minutes  = new MinutePicker(minutesEl, validator);

  this.on('change', function(time){
    self.header.update(time);
  });

  this.timePart.on('change', function(){
    self.reset();
    self.renderHours();
    self.emit('change', self.getTime());
  });

  this.header.on('click', function(type){
    if(type === constants.TIME_OPTION.TYPE.HOUR){
      self.renderHours();
    }
    else {
      self.renderMinutes();
    }
  });

  this.hours.on('change', function(){
    self.minutes.reset();
    self.minutes.value = null;
    self.renderMinutes();
    self.emit('change', self.getTime());
  });

  this.minutes.on('change', function(){
    self.renderStart();
    self.emit('change', self.getTime());
  });
};

/**
 * renders the starting state
 * @private
 * @function renderStart
 */
TimePicker.prototype.renderStart = function(){
  this.minutes.hide();
  this.disableClockFace();
  this.hours.show(this.timePart.value);
};

/**
 * renders the hours clock
 * @private
 * @function renderHours
 */
TimePicker.prototype.renderHours = function(){
  this.minutes.hide();
  this.enableClockFace();
  this.hours.show(this.timePart.value);
};

/**
 * renders the minutes clock
 * @private
 * @function renderMinutes
 */
TimePicker.prototype.renderMinutes = function(){
  this.hours.hide();
  this.enableClockFace();
  this.minutes.show(this.hours.value, this.timePart.value);
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
  return (!!this.timePart.value && !!this.hours.value && !!this.minutes.value);
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
 * @returns {{hours: Number, minutes: Number, timePart: Number}}
 */
TimePicker.prototype.getTime = function(){
  return {
    hours: this.hours.value,
    minutes: this.minutes.value,
    timePart: this.timePart.value
  };
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
  this.emit('change', this.getTime());
};

/**
 * removes the enabled clock face style
 * @private
 * @type {Function}
 */
TimePicker.prototype.disableClockFace = function (){
  this.clockFace.classList.remove('timepicker__clockface--enabled');
};

/**
 * adds the enabled clock face style
 * @private
 * @type {Function}
 */
TimePicker.prototype.enableClockFace = function (){
  this.clockFace.classList.add('timepicker__clockface--enabled');
};

/**
 * @alias TimeRange
 */
TimePicker.TimeRange = require('./src/time-range');
Emitter(TimePicker.prototype);
module.exports = TimePicker;
