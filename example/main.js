var TimePicker = require('..');
var el = document.body.querySelector('.js-timepicker');
window.tp = new TimePicker({
  el: el
});

window.tp.show();