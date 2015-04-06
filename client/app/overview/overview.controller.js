'use strict';

angular.module('WordRiverApp')
  .controller('OverviewCtrl', function ($scope, $http, socket) {
    $scope.studentList = [];
    $scope.contextPacks = [];

    $scope.textField = "";
    $scope.tileField = "";
    $scope.wordTypeField = "";

    $scope.showPack = false;
    $scope.currentPack = null;
    $scope.showTileAdder = false;
    $scope.showStudent = false;
    $scope.currentStudent = null;
    $scope.groupList = [];

    $scope.studentPacks = [];

    $scope.isChecked = false;

    $http.get('/api/students').success(function(studentList) {
      $scope.studentList = studentList;
      socket.syncUpdates('student', $scope.studentList);
      console.log($scope.studentList[0].lastName);
    });

    $scope.getGroupList = function(){
      $http.get('/api/users/me').success(function(user) {
        $scope.groupList = user.studentGroups;
        //socket.syncUpdates('group', $scope.groupList);
        console.log($scope.groupList[0]);
      });
    };

    $scope.getGroupList();
    $scope.showStudentList = true;
    $scope.showGroupList = false;

    $scope.studentListInGroup = [
      {name:String}
    ];

    $scope.showStudents = function(Object) {
      $scope.showStudentList = false;
      $scope.studentListInGroup.length = 0;
      //$scope.showGroupList = ! $scope.showGroupList;
      for (var i=0; i < Object.students.length; i++) {
        $scope.studentListInGroup.push({name:Object.students[i].name});
      }
    };



    $scope.getPacks = function() {
      $http.get('/api/packs').success(function (contextPack) {
        $scope.contextPacks = contextPack;
        socket.syncUpdates('pack', $scope.contextPacks);
      });
    };

    $scope.getPacks();

    //This deletes just the context pack for students
    $scope.confirmDeleteStudentPack = function(index) {
      this.index = index;

      if (confirm("Are you sure you want to delete this student's Context Pack?") == true) {
        $scope.currentStudent.studentContextPackArray.splice(index, 1);
      }
      console.log($scope.studentList[index]);
      //console.log($scope.studentList[index].studentContextPackArray[index]);
    };


    //This deletes context pack from the database
    $scope.deletePack = function(index) {
      this.index = index;
      $http.delete('/api/packs/' + $scope.contextPacks[index]._id)
    };


    $scope.confirmDelete = function(index) {
      this.index = index;
      if (confirm("Are you sure you want to delete " + $scope.contextPacks[index].packName + "?") == true) {
        $scope.deletePack(index);
      }
    };




    //$scope.deleteTile = function(pack,index) {
    //  return pack.splice(index, 1);
    //};

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('pack');
    });

    $scope.addContextPacks = function () {
      if ($scope.textField.length >= 1) {
        $http.post('/api/packs', {packName: ($scope.textField), tiles: []});
      }
      $scope.textField="";
    };

    $scope.addTile = function() {
      if ($scope.tileField.length >= 1) {
        var tiles =  {
          wordName: ($scope.tileField),
          wordType: ($scope.wordTypeField)
        };
        $scope.currentPack.tiles.push(tiles);

        $http.patch('/api/packs/' + $scope.currentPack._id,
          {tiles: $scope.currentPack.tiles}
        ).success(function(){
            console.log("Patch completed!");
            console.log($scope.contextPacks);
          });

        //$http.post('/api/packs', {packName: $scope.currentPack.packName, tiles: $scope.currentPack.tiles});
        //$http.delete('/api/packs/' + $scope.currentPack._id);
        $scope.showTileAdder = true;
        $scope.tileField = "";

      }
    };

    $scope.confirmTileDelete = function (pack, index) {
      this.pack = pack;
      this.index = index;
      if (confirm("Are you sure you want to delete this tile?") == true) {
        $scope.deleteTile(pack, index);
      }
    };

    $scope.deleteTile = function(pack, index) {
      pack.tiles.splice(index, 1);
      $http.patch('/api/packs/' + pack._id,
        {tiles: pack.tiles}
      ).success(function() {
          console.log("Patch completed!");
          console.log($scope.contextPacks);
        });
      //$http.post('/api/packs', {packName: pack.packName, tiles: pack.tiles});
      //$http.delete('/api/packs/' + pack._id);
    };

    $scope.showTileAdder = false;
    $scope.toggleShowAdder = function() {
      $scope.showTileAdder = !$scope.showTileAdder;
      console.log($scope.showTileAdder);
    };

    $scope.packInfo = function(pack){
      $scope.showPack = true;
      $scope.currentPack = pack;
    };

    $scope.studentInfo = function(student){
      $scope.showStudent = true;
      $scope.currentStudent = student;
    };

    $scope.isObjectChecked = function(object) {
      return object.isChecked;
    };

    $scope.assignContextPack = function() {
      var checkedGroups = [];

      for(var i = 0; i < $scope.studentList.length; i++) {
        for (var j = 0; j < $scope.contextPacks.length; j++) {
          if ($scope.isObjectChecked($scope.studentList[i])) {
            if ($scope.isObjectChecked($scope.contextPacks[j])) {
              $scope.preventDuplication($scope.studentList[i].studentContextPackArray, $scope.contextPacks[j]);
              $http.patch('/api/students/' + $scope.studentList[i]._id,
                {studentContextPackArray: $scope.studentList[i].studentContextPackArray}
              ).success(function(){
                  console.log("Student got context packs!");
                  console.log($scope.studentList[0].firstName+ ":" + $scope.studentList[0].studentContextPackArray[0].packName);
                });

            }
          }
        }
      }


      console.log($scope.studentContextPackArray);
      //Added functionality to assign Context Packs to Groups based on code above
      for (i = 0; i < $scope.groupList.length; i++) {
        if ($scope.groupList[i].isChecked) {
          checkedGroups.push($scope.groupList[i]);
        }
      }

        for (i = 0; i < checkedGroups.length; i++) {
          for (var j = 0; j < $scope.contextPacks.length; j++) {
            if ($scope.contextPacks[j].isChecked) {
              //console.log("Adding pack to: " + $scope.groupList[i]);
              $scope.groupList[i].groupContextPackArray.push($scope.contextPacks[j]);
            }
          }
        }
      };

    $scope.orderBy = function (property) {
      var sortOrder = 1;
      if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a,b) {
        //var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        var result = 0;
        if (a[property] < b[property]) {
          result = -1;
        } else if (a[property] > b[property]) {
          result=1;
        } else {
          result = 0;
        }
        console.log("Things Should show up");
        return result * sortOrder;
      }
    };


    $scope.toSortForContextPacks = "packName";
    $scope.orderForContextPacks = true;

    $scope.toSortForTiles = "tiles";
    $scope.orderForTiles = true;

    $scope.preventDuplication = function(array, item) {
      if(array.indexOf(item) == -1) {
        array.push(item)
      }
    };
  });





