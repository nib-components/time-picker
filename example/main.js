var TimePicker = require('..');
var el = document.body.querySelector('.js-timepicker');
window.tp = new TimePicker({
  el: el,
  valid: {
    from: '8am',
    to: '8:15pm'
  }
});

window.tp.show();