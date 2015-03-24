'use strict';

angular.module('WordRiverApp')
  .controller('AddingWordsCtrl', function ($rootScope, $scope, $http, socket) {
    $scope.currentWords = [];
    $scope.allWords = [];

    $scope.checkedWords=[];
    $scope.checkedStudents=[];

    $scope.wordField = "";

    //beforeEach(module('wordRiverTeamFtlApp'));
    //beforeEach(module('socketMock'));

    $scope.getWords = function(){
      $http.get('/api/packs').success(function(AllWordsDatabases) {
        $scope.currentWords = AllWordsDatabases;
        $scope.allWords = $scope.currentWords;
      });
    };

    $scope.getWords();

    $scope.addWords = function(){
      if($scope.wordField.length >= 1) {
          <!--these words will be going into the individuals page, possibly the class words, and added to her program (words they can use) -->
        $http.post('/api/packs', {tiles: [$scope.wordField]}).success(function () {
            $scope.getWords();
            $scope.allWords.push({tiles: [$scope.wordField]});
          });
          $scope.wordField = "";
      }
    };

    $scope.hasDuplicateValues = function() {
      var input = $scope.wordField;
      var array = $scope.allWords;
      for (var i = 0; i < array.length; i++) {
        var arrayValue = array[i].tiles;
        if (input === arrayValue){
          alert("This word already exists.");
          return true;
        }
      }
      $scope.addWords();
      return false;

    };

    $scope.removeData = function(index){
      $http.delete('/api/packs/' + $scope.allWords[index]._id).success(function(){
        $scope.getWords();
      });
    };

    $scope.checkAllCheckboxes = function(field){
      for (var i = 0; i < field.length; i++){
        field[i].checked = true;
      }
    };

    $scope.unCheckAllCheckboxes = function(field){
      for (var i = 0; i < field.length; i++){
        field[i].checked = false;
      }
    };

    $scope.isChecked = false;
    $scope.studentChecked = false;

    $scope.allCheckedWords = function(object){
      console.log("this is before the if statement in the allCheckedWords words function");
      object.value = !object.value;
      if(object.value==!$scope.isChecked){
        console.log("this is after the if statement in the allCheckedWords words function");
        console.log('true');
        $scope.checkedWords.push(object.tiles);
        console.log("this is after the push statement in the allCheckedWords words function");
        console.log(object.tiles);
      }
      else if(object.value == false){
        console.log("false");
      }
    };

    $scope.allCheckedStudents = function(object){
      object.value = !object.value;
      if(object.value == !$scope.studentChecked){
        console.log('true');
        $scope.checkedStudents.push(object.student);
        console.log(object.student);
      }
        else if(object.value == false){
           console.log("false");
       }
    };

    // There wasn't enough time to link it to an actual id
    //$scope.wordsBeingSent = function(){
    //  for(var i=0; i< $scope.checkedStudents.length;i++) {
    //    if($scope.checkedStudents[i] == FindStudentById()){
    //      $http.post('/app/profile_id', {words: $scope.wordField}).success(function () {
    //
    //      })
    //    }
    //  };
    //
    //
    //};
//=========================================================================
    $scope.students = [];
  //  $scope.classList = [];
    $scope.studentList = [];
    $scope.studentSortArray = [];
    $scope.filterText = null;
    $rootScope.currentStudent = null;


    $http.get('/api/student').success(function(students) {
      $scope.students = students;
      socket.syncUpdates('student', $scope.students);
      $scope.totalClasses();
      $scope.populateStudentArray();
    });

    $scope.addStudent = function() {
      if($scope.newStudent === '') {
        return;
      }
      $http.post('/api/students', { name: $scope.newStudent });
      $scope.newStudent = '';
    };

    $scope.deleteStudent = function(student) {
      $http.delete('/api/students/' + student._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('student');
    });

    ////creates a list of all classes that exist
    //$scope.totalClasses = function(){
    //  for(var i=0; i<$scope.students.length;i++){
    //    var found = false;
    //    for(var j=0; j<=$scope.classList.length; j++){
    //      if($scope.classList[j]==$scope.students[i].class){
    //        found = true;
    //      }
    //    }
    //    if (!found){
    //      $scope.classList.push($scope.students[i].class);
    //    }
    //  }
    //};

    //creates a list of students
    $scope.populateStudentArray = function(){
      for(var i=0; i<$scope.students.length; i++){
        var name = $scope.students[i].firstName + " " + $scope.students[i].lastName;
        $scope.studentList.push({student: name});
      }



      //for(var i=0; i<$scope.students.length; i++){
      //  for(var j=0; j<$scope.classList.length; j++){
      //    if($scope.students[i].class == $scope.classList[j]){
      //      var name = $scope.students[i].firstName + " " + $scope.students[i].lastName;
      //      $scope.studentList.push({student: name, course: $scope.classList[j]});
      //    }
      //  }
      //}
    };

    //changes the class view
    $scope.changeFilter = function(str){
      $scope.filterText = str;
    };

    $scope.makeCurrentStudent = function(student){
      $rootScope.currentStudent = student;
    };

  //});

});
