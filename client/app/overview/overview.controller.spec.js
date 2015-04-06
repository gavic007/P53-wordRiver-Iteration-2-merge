'use strict';

describe('Controller: OverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('WordRiverApp'));
  beforeEach(module('socketMock'));

  var OverviewCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/packs')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    $httpBackend.expectGET('/api/students')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    OverviewCtrl = $controller('OverviewCtrl', {
      $scope: scope
    });
  }));

  it('this is a sanity check', function () {
    expect(true).toBe(true);
  });

  it('should test confirm delete', function () {
    scope.contextArray = [];
    scope.contextArray.push(scope.addContextPacks({packName: "Love"}));
    scope.confirmdeletecontextArray = window.confirm("want to delete?");
    if(scope.confirmdeletecontextArray) {
      expect(scope.contextArray.toBeTruthy({packName: "Love"}));
    }
  });

  it('should prevent a duplicates from being added to an array', function () {
    var test = ["stuff", "more", "people"];
    scope.preventDuplication(test, "people");
    expect(test.length).toBe(3);
  });

  it('should allow non duplicates to be added to an array', function () {
    var test = ["stuff", "more", "people"];
    scope.preventDuplication(test, "new");
    expect(test.length).toBe(4);
  });

  it('should allow for deletion of a context pack', function () {
    var students = [{
      "firstName": "Liza",
      "lastName": "Pratt",
      "id": "0001",
      "studentContextPackArray": [],
      "studentWordArray": []
    },
      {
        "firstName": "Battle",
        "lastName": "Whitaker",
        "id": "0002",
        "studentContextPackArray": ["this", "should", "delete", "me"],
        "studentWordArray": []
      },
      {
        "firstName": "Leanna",
        "lastName": "Garrison",
        "id": "0003",
        "studentContextPackArray": [],
        "studentWordArray": []
      },
      {
        "firstName": "Sherman",
        "lastName": "Foster",
        "id": "0004",
        "studentContextPackArray": [],
        "studentWordArray": []
      }];
      var test = ["this", "should", "delete", "me"];
      scope.currentStudent = students[1];
      scope.confirmbox = window.confirm("want to delete?");
      if(scope.confirmbox){
        expect(scope.currentStudent.studentContextPackArray[0].length).toBe(3);
      }

    });

  it('should sort an array of objects based on passed in object in ascending order', function () {
    var students = [{
      "firstName": "Liza",
      "lastName": "Pratt"
    },
      {
        "firstName": "Battle",
        "lastName": "Whitaker"
      },
      {
        "firstName": "Leanna",
        "lastName": "Garrison"
      },
      {
        "firstName": "Sherman",
        "lastName": "Foster"
      }];
    students.sort(scope.orderBy("firstName"));
    expect(students[0].firstName).toBe("Battle");
  });

  it('should sort an array of objects based on passed in -object in descending order', function () {
    var students = [{
      "firstName": "Liza",
      "lastName": "Pratt"
    },
      {
        "firstName": "Battle",
        "lastName": "Whitaker"
      },
      {
        "firstName": "Leanna",
        "lastName": "Garrison"
      },
      {
        "firstName": "Sherman",
        "lastName": "Foster"
      }];
    students.sort(scope.orderBy("-firstName"));
    expect(students[0].firstName).toBe("Sherman");
  });

  it('should return a true when passed in a checked object, false otherwise', function () {
    var students = [{
      "firstName": "Liza",
      "lastName": "Pratt",
      "isChecked": true
    },
      {
        "firstName": "Battle",
        "lastName": "Whitaker"
      },
      {
        "firstName": "Leanna",
        "lastName": "Garrison"
      },
      {
        "firstName": "Sherman",
        "lastName": "Foster"
      }];

    expect(scope.isObjectChecked(students[0])).toBeTruthy();
    expect(scope.isObjectChecked(students[1])).toBeFalsy();
  });

  it('should show a list of students', function () {
    var students = [{
      "name": "Liza",
      "lastName": "Pratt"
    },
      {
        "name": "Battle",
        "lastName": "Whitaker"
      },
      {
        "name": "Leanna",
        "lastName": "Garrison"
      },
      {
        "name": "Sherman",
        "lastName": "Foster"
      }];
    scope.studentListInGroup = [
      {name:String}
      ];
    expect(scope.studentListInGroup.length).toBe(1);
  });
    //it('should attach a list of things to the scope', function () {
    //  $httpBackend.flush();
    //  expect(scope.awesomeThings.length).toBe(4);
    //});

    //These tests don't test functionality, they should probably be removed. -Lemmon
    //it('should be things in the list i.e. heroPack, zoo, biomes, cars, disney', function () {
    //  expect(scope.contextPacks[0].pack).toBe('heroPack');
    //  expect(scope.contextPacks[1].pack).toBe('zoo');
    //  expect(scope.contextPacks[2].pack).toBe('biomes');
    //  expect(scope.contextPacks[3].pack).toBe('cars');
    //  expect(scope.contextPacks[4].pack).toBe('disney');
    //  expect(scope.contextPacks[5]).toBe(undefined);
    //});

    //it('should be 5', function () {
    //  expect(scope.contextPacks.length).toBe(5);
    //});
  });

