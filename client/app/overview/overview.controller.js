'use strict';

angular.module('WordRiverApp')
  .controller('OverviewCtrl', function ($scope, $http, socket) {
    $scope.studentList = [];
    $scope.contextPacks = [];

    $scope.textField = "";
    $scope.tileField = "";

    $scope.showPack = false;
    $scope.currentPack = null;
    $scope.showTileAdder = false;

    $scope.groupList = [];

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

    $scope.showdetails = function(group) {
      document.getElementById("studentList").innerHTML = "";
      var words = "";
      for (var i = 0; i < group.students.length; i++) {
        words = words + group.students[i].name + "<br>";
      }
      document.getElementById("studentList").innerHTML = "<u>" + group.groupName + "</u><br/>" + words;
    };

    $scope.getPacks = function() {
      $http.get('/api/packs').success(function (contextPack) {
        $scope.contextPacks = contextPack;
        socket.syncUpdates('pack', $scope.contextPacks);
      });
    };

    $scope.getPacks();

    $scope.deletePack = function(index) {
      $http.delete('/api/packs/' + $scope.contextPacks[index]._id)
    };

    //$scope.deleteTile = function(pack,index) {
    //  return pack.splice(index, 1);
    //};

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('pack');
    });


    $scope.addContextPacks = function () {
      if ($scope.textField.length >= 1) {
        $http.post('/api/packs', {packName: $scope.textField, tiles: []});
      }
      $scope.textField="";
    };

    $scope.addTile = function() {
      if ($scope.tileField.length >= 1) {
        $scope.currentPack.tiles.push($scope.tileField);

        $http.patch('/api/packs/' + $scope.currentPack._id,
          {tiles: $scope.currentPack.tiles}
        ).success(function(){
            console.log("Patch completed!");
            console.log($scope.contextPacks);
          });

        //$http.post('/api/packs', {packName: $scope.currentPack.packName, tiles: $scope.currentPack.tiles});
        //$http.delete('/api/packs/' + $scope.currentPack._id);
        $scope.tileField = "";

      }
    };

    $scope.deleteTile = function(pack, index) {
      pack.tiles.splice(index, 1)
      $http.patch('/api/packs/' + pack._id,
        {tiles: pack.tiles}
      ).success(function() {
          console.log("Patch completed!");
          console.log($scope.contextPacks);
        });
      //$http.post('/api/packs', {packName: pack.packName, tiles: pack.tiles});
      //$http.delete('/api/packs/' + pack._id);
    };

    $scope.toggleShowAdder = function() {
      $scope.showTileAdder = !$scope.showTileAdder;
    };

    $scope.packInfo = function(pack){
      $scope.showPack = true;
      $scope.currentPack = pack;
    };
  });
