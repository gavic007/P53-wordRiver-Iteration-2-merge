'use strict';

describe('Controller: AddingWordsCtrl', function () {

  // load the controller's module
  beforeEach(module('WordRiverApp'));
  beforeEach(module('socketMock'));


  var AddingWordsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddingWordsCtrl = $controller('AddingWordsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });

  it('should add a word', function() {
    scope.allWords = [];
    scope.allWords.push(scope.addWords("clocks"));
    expect(scope.allWords.length == 1);
  });

  it('should test confirm delete', function() {
    scope.allWords = [];
    scope.allWords.push(scope.addWords("fun"));
    scope.confirmDeleteWord = window.confirm("are you sure you want to remove this word?");
    if(scope.confirmDeleteWord) {
      expect(scope.allWords.toBeTruthy("fun"));
      console.log("Is this test working?");
    }
  });

  it('should prevent duplicates', function(){
    scope.allWords = ["bear", "necklace", "ring"];
    scope.preventDuplication(scope.allWords, "bear");
    expect(scope.allWords.length).toBe(3);
    //console.log("Duplicates were not allowed");
  });




});
