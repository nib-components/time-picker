var Validator  = require('../src/validator');
var TimeOption = require('../src/time-option');
var constants  = require('../src/constants');
var TimeRange  = require('../src/time-range');

describe('Validator', function() {

  var input, expected, output, validator;

  describe('.()', function(){
    it('should convert simple am range', function(){
      input = new TimeRange('9am', '10am');
      expected = [
        {hour: 9, minute: 0},
        {hour: 9, minute: 5},
        {hour: 9, minute: 10},
        {hour: 9, minute: 15},
        {hour: 9, minute: 20},
        {hour: 9, minute: 25},
        {hour: 9, minute: 30},
        {hour: 9, minute: 35},
        {hour: 9, minute: 40},
        {hour: 9, minute: 45},
        {hour: 9, minute: 50},
        {hour: 9, minute: 55},
        {hour: 10, minute: 0}
      ];
      output = new Validator(input).am;
      expect(expected).toEqual(output);
    });
    it('should convert over am/pm', function(){
      input = new TimeRange('11:30am', '12:30pm');
      expected = {
        am: [
          {hour: 11, minute: 30},
          {hour: 11, minute: 35},
          {hour: 11, minute: 40},
          {hour: 11, minute: 45},
          {hour: 11, minute: 50},
          {hour: 11, minute: 55}
        ],
        pm: [
          {hour: 12, minute: 0},
          {hour: 12, minute: 5},
          {hour: 12, minute: 10},
          {hour: 12, minute: 15},
          {hour: 12, minute: 20},
          {hour: 12, minute: 25},
          {hour: 12, minute: 30}
        ]
      };
      var validator = new Validator(input);
      output = {am: validator.am, pm: validator.pm};
      expect(expected).toEqual(output);
    });
    it('should convert over larger am/pm', function(){
      input = new TimeRange('11am', '1pm');
      expected = {
        am: [
          {hour: 11, minute: 0},
          {hour: 11, minute: 5},
          {hour: 11, minute: 10},
          {hour: 11, minute: 15},
          {hour: 11, minute: 20},
          {hour: 11, minute: 25},
          {hour: 11, minute: 30},
          {hour: 11, minute: 35},
          {hour: 11, minute: 40},
          {hour: 11, minute: 45},
          {hour: 11, minute: 50},
          {hour: 11, minute: 55}
        ],
        pm: [
          {hour: 12, minute: 0},
          {hour: 12, minute: 5},
          {hour: 12, minute: 10},
          {hour: 12, minute: 15},
          {hour: 12, minute: 20},
          {hour: 12, minute: 25},
          {hour: 12, minute: 30},
          {hour: 12, minute: 35},
          {hour: 12, minute: 40},
          {hour: 12, minute: 45},
          {hour: 12, minute: 50},
          {hour: 12, minute: 55},
          {hour: 1, minute: 0}
        ]
      };
      var validator = new Validator(input);
      output = {am: validator.am, pm: validator.pm};
      expect(expected).toEqual(output);
    });
  });

  describe('.validateHour()', function(){
    it('should validate with simple am range', function(){
      input = new TimeRange('9am', '10am');
      validator = new Validator(input);
      var timeOption = new TimeOption({
        value: 9,
        type: constants.TIME_OPTION.TYPE.HOUR
      });
      output = validator.validateHour(timeOption, 0);
      expect(output).toBeTruthy();
    });

    it('should validate with simple pm range', function(){
      input = new TimeRange('9pm', '10pm');
      validator = new Validator(input);
      var timeOption = new TimeOption({
        value: 9,
        type: constants.TIME_OPTION.TYPE.HOUR
      });
      output = validator.validateHour(timeOption, 1);
      expect(output).toBeTruthy();
    });

    it('should validate over am/pm range', function(){
      input = new TimeRange('9am', '10pm');
      validator = new Validator(input);
      var timeOption = new TimeOption({
        value: 9,
        type: constants.TIME_OPTION.TYPE.HOUR
      });

      output = validator.validateHour(timeOption, 0);
      expect(output).toBeTruthy();

      timeOption.value = 11;
      output = validator.validateHour(timeOption, 0);
      expect(output).toBeTruthy();

      timeOption.value = 1;
      output = validator.validateHour(timeOption, 1);
      expect(output).toBeTruthy();

      timeOption.value = 3;
      output = validator.validateHour(timeOption, 1);
      expect(output).toBeTruthy();

      timeOption.value = 5;
      output = validator.validateHour(timeOption, 1);
      expect(output).toBeTruthy();
    });
  });

  describe('.validateMinute()', function(){
    it('should validate minutes', function(){
      input = new TimeRange('9am', '10pm');
      validator = new Validator(input);
      var timeOption = new TimeOption({
        value: 5,
        type: constants.TIME_OPTION.TYPE.MINUTE
      });

      output = validator.validateMinute(timeOption, 9, 0); //9:05am
      expect(output).toBeTruthy();

      output = validator.validateMinute(timeOption, 10, 0); //10:05am
      expect(output).toBeTruthy();

      output = validator.validateMinute(timeOption, 1, 1); //1:05pm
      expect(output).toBeTruthy();

      output = validator.validateMinute(timeOption, 7, 1); //7:05pm
      expect(output).toBeTruthy();
    });
  });

});