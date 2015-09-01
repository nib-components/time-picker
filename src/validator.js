var constants = require('./constants');

var getTimeObj = function(input){
  var split, timePart, hour, minute;
  input = input.toUpperCase();
  timePart = input.indexOf('AM') > -1 ? 'AM' : 'PM';
  split = input.split(timePart)[0].split(':');
  hour = parseInt(split[0]);
  minute = split[1] ? parseInt(split[1]) : 0;
  return {
    hour: hour,
    minute: minute,
    timePart: timePart === 'AM' ? constants.TIME_PARTS.AM : constants.TIME_PARTS.PM
  };
};

/**
 * Validator - validates an hour or minute given a date range
 * @param rangeOrValidation {TimeRange|function} - the date range containing a to/from of valid times, e.g {from: '8am', to: '3pm'} or a validation function that provides the hour, minute and time part
 * @constructor
 */
var Validator = function(rangeOrValidation){
  if(typeof rangeOrValidation === 'function'){
    this.validation = rangeOrValidation;
    return;
  }
  this.am = [];
  this.pm = [];
  var start = getTimeObj(rangeOrValidation.from);
  var end = getTimeObj(rangeOrValidation.to);
  var toPush;
  while(start.timePart !== end.timePart || start.hour !== end.hour || start.minute !== end.minute){
    toPush = start.timePart === constants.TIME_PARTS.AM ? this.am : this.pm;
    toPush.push({
      hour: start.hour,
      minute: start.minute
    });

    if(start.hour === 11 && start.minute === 55 && start.timePart === constants.TIME_PARTS.AM){
      start.timePart = constants.TIME_PARTS.PM;
    }
    if(start.hour === 12 && start.minute === 55){
      start.hour = 1;
    }
    else if(start.minute === 55){
      start.hour++;
    }
    start.minute = start.minute === 55 ? 0 : start.minute + 5;
  }

  toPush = start.timePart === constants.TIME_PARTS.AM ? this.am : this.pm;
  toPush.push({
    hour: end.hour,
    minute: end.minute
  });
};

/**
 * @public
 * @method validateHour - validates an hour is within the given time range
 * @param hour {TimeOption} - the time option to validate
 * @param timePart {Number} - The binary representation of the am/pm time part applied to the hour
 * @returns {boolean} - whether the hour is valid or not
 */
Validator.prototype.validateHour = function(hour, timePart){
  if(this.validation){
    return this.validation({
      hour: hour,
      timePart: timePart
    });
  }
  var toCheck = timePart === constants.TIME_PARTS.AM ? this.am : this.pm;
  if(toCheck.length > 0){
    for(var i = 0; i < toCheck.length; i++){
      var check = toCheck[i];
      if(check.hour === hour.value){
        return true;
      }
    }
  }
  return false;
};

/**
 * @public
 * @method validateMinute - validates a minute is within the given time range
 * @param minute {TimeOption} - the time option to validate
 * @param hour {Number} - the hour applied to the time option
 * @param timePart {Number} - The binary representation of the am/pm time part applied to the minute
 * @returns {boolean} - whether the minute is valid or not
 */
Validator.prototype.validateMinute = function(minute, hour, timePart){
  if(this.validation){
    return this.validation({
      hour: hour,
      minute: minute,
      timePart: timePart
    });
  }
  var toCheck = timePart === constants.TIME_PARTS.AM ? this.am : this.pm;
  if(toCheck.length > 0){
    for(var i = 0; i < toCheck.length; i++){
      var check = toCheck[i];
      if(check.hour === hour && check.minute === minute.value){
        return true;
      }
    }
  }
  return false;
};

Validator.prototype.firstHour = function(timePart){
  return timePart === constants.TIME_PARTS.AM ? this.am[0] : this.pm[0];
};

Validator.prototype.firstMinute = function(hour, timePart){
  var time = timePart === constants.TIME_PARTS.AM ? this.am : this.pm;
  for(var i = 0; i <  time.length; i++){
    var candidate = time[i];
    if(candidate.hour === hour){
      return candidate;
    }
  }
  return {};
};

module.exports = Validator;

