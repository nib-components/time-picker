var TimePicker = require('..');
var el = document.body.querySelector('.js-timepicker');
window.tp = new TimePicker({
  el: el,
  valid: {
    from: '8:15am',
    to: '8:15pm'
  }
});

window.tp.show();

document
  .body
  .querySelector('.js-change-hour')
  .addEventListener('click', function(){
    window.tp.renderHours();
  });

document
  .body
  .querySelector('.js-change-minute')
  .addEventListener('click', function(){
    window.tp.renderMinutes();
  });