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
var myTimePicker = new TimePicker({
  el: document.body.querySelector('.js-time-picker-container'),
  valid: new TimePicker.TimeRange('9:35am'/*from*/, '8pm' /*to*/)
});
```

when you need to update the valid range
```js
myTimePicker.updateValid(new TimePicker.TimeRange('8am', '7:05pm'));
```

actually getting the time that has been set
```js
// user selects 9:35am
var time = myTimePicker.getTime();
console.log(time.hours);
// 9
console.log(time.minutes);
// 35
console.log(time.timePart);
// 0
// timeParts are binary representations of am/pm - where am = 0 and pm = 1
```

## TODO more jsdoc, more readme
