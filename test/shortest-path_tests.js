var ShortestPath  = require('../src/shortest-path');

describe('ShortestPath', function() {

  var expected, result, path;

  describe('.find()', function(){

    beforeEach(function(){
      path = new ShortestPath();
    });

    it('should find a short forward path', function(){
      expected = 60;
      result = path.find(2);
      expect(expected).toEqual(result);
    });

    it('should find a long forward path', function(){
      expected = 150;
      result = path.find(5);
      expect(expected).toEqual(result);
    });

    it('should find a short backward path', function(){
      expected = -60;
      result = path.find(10);
      expect(expected).toEqual(result);
    });

    it('should find a long backward path', function(){
      expected = -150;
      result = path.find(7);
      expect(expected).toEqual(result);
    });

    //it('should find a forward then backward path', function(){
    //  expected = 30;
    //  result = path.find(1);
    //  expect(expected).toEqual(result);
    //
    //  expected = 30;
    //  result = path.find(1);
    //  expect(expected).toEqual(result);
    //});

  });

});