var constants = require('./constants');

var TimeOption = function(options){

  this.type = options.type;
  this.value = options.value;

  this.el = document.createElement('div');
  this.el.classList.add('timepicker-' + this.type + '__' + this.value);
  this.el.innerHTML = this.value;
  if(this.type === constants.TIME_OPTION.MINUTE && this.value === 0){
    this.el.innerHTML = '00';
  }

};

TimeOption.prototype.setEnabled = function(isEnabled){
  this.isEnabled = isEnabled;
  this.el.classList[isEnabled ? 'add' : 'remove']('timepicker-' + this.type + '--enabled');
};

module.exports = TimeOption;