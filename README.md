# time-picker
Like a date picker, but for time. Looks like a clock.

## usage
```js
var TimePicker = require('time-picker');
//...
var myTimePicker = new TimePicker({
  el: document.body.querySelector('.js-time-picker-container')
});
```

or if you need to set a valid time range
```js
var TimeRange = require('time-picker').TimeRange;

// using a TimeRange
var myTimePicker = new TimePicker({
  el: document.body.querySelector('.js-time-picker-container'),
  valid: new TimeRange('9:35am'/*from*/, '8pm' /*to*/)
});

// using a validation function
var myTimePicker = new TimePicker({
  el: document.body.querySelector('.js-time-picker-container'),
  valid: function(time){
    return time.hour > 6; // 7am-12am + 7pm-12pm
  }
});
// where time = { hour: Number, minute: Number|null, timePart: Number }
```

when you need to update the valid range/validation function
```js
myTimePicker.updateValid(new TimeRange('8am', '7:05pm'));
// or
myTimePicker.updateValid(function(time){
  return time.hour <= 6; // 1am-6am + 1pm-6pm
});
```

actually getting the time that has been set
```js
// user selects 9:35am
console.log(myTimePicker.hours.value);
// 9
console.log(myTimePicker.minutes.value);
// 35
console.log(myTimePicker.timePart.value);
// 0
// timeParts are binary representations of am/pm - where am = 0 and pm = 1
```

## TODO more jsdoc, more readme
