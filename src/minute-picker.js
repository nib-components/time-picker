var TimeOption = require('./time-option');
var Emitter    = require('component-emitter');
var constants  = require('./constants');

/**
 * @class MinutePicker - to pick minutes
 * @param el {Element}
 * @param validator {Validator}
 * @constructor
 */
var MinutePicker = function(el, validator){
  this.el = el;
  this.minutes = [];
  this.validator = validator;
  this.el.innerHTML = '';
  for(var i = 0; i < 12; i++){
    // create minute buttons
    var min = new TimeOption({
      value: i*5,
      type: constants.TIME_OPTION.TYPE.MINUTE
    });
    min.el.addEventListener('click', this.click.bind(this, min));
    this.el.appendChild(min.el);
    this.minutes.push(min);
  }
};

/**
 * @public
 * @method show - shows the minute picker
 * @param {Number} hour - the hour corresponding to the minutes shown
 * @param {Number} timePart - the time part corresponding to the minutes shown (0/1 for am/pm respectively)
 */
MinutePicker.prototype.show = function (hour, timePart){
  if(this.validator){
    for(var i = 0; i < this.minutes.length; i++){
      var min = this.minutes[i];
      min.setEnabled(this.validator.validateMinute(min, hour, timePart));
    }
  }
  this.el.classList.remove('is-hidden');
};

/**
 * @public
 * @method hide - hides the minute picker
 */
MinutePicker.prototype.hide = function (){
  this.el.classList.add('is-hidden');
};

/**
 * @public
 * @method reset - resets the selected state of minutes
 */
MinutePicker.prototype.reset = function(){
  for(var i = 0; i < this.minutes.length; i++){
    this.minutes[i].el.classList.remove('timepicker__minutes--selected');
  }
};

/**
 * @method click
 * @private
 */
MinutePicker.prototype.click = function(min){
  if(min.isEnabled){
    this.value = min.value;
    this.reset();
    min.el.classList.add('timepicker__minutes--selected');
    this.emit('change', this.value);
  }
};

Emitter(MinutePicker.prototype);
module.exports = MinutePicker;

