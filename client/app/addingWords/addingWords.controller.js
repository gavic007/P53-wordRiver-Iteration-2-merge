'use strict';

angular.module('WordRiverApp')
  .controller('AddingWordsCtrl', function ($rootScope, $scope, $http, socket) {
    $scope.currentWords = [];
    $scope.allWords = [];

    $scope.checkedWords = [];
    $scope.checkedStudents = [];

    $scope.wordField = "";

    //beforeEach(module('wordRiverTeamFtlApp'));
    //beforeEach(module('socketMock'));

    $scope.getWords = function () {
      $http.get('api/AddingWordsDatabases').success(function (AllWordsDatabases) {
        $scope.currentWords = AllWordsDatabases;
        $scope.allWords = $scope.currentWords;
      });
    };

    $scope.getWords();

    $scope.addWords = function () {
      //console.log("adding words function before if statement");
      if ($scope.wordField.length >= 1) {
        // console.log("adding words function after if statement");
        <!--these words will be going into the individuals page, possibly the class words, and added to her program (words they can use) -->
        $http.post('api/AddingWordsDatabases', {words: $scope.wordField}).success(function () {
          console.log("allCheckedWords function after post statement");
          $scope.getWords();
          $scope.allWords.push({words: $scope.wordField});
          console.log("adding words function after if push thing");
        });
        $scope.wordField = "";
      }
    };

    $scope.hasDuplicateValues = function () {
      var input = $scope.wordField;
      var array = $scope.allWords;
      for (var i = 0; i < array.length; i++) {
        var arrayValue = array[i].words;
        if (input === arrayValue) {
          alert("This word already exists.");
          return true;
        }
      }
      $scope.addWords();
      return false;

    };

    $scope.removeData = function (index) {
      $http.delete('api/AddingWordsDatabases/' + $scope.allWords[index]._id).success(function () {
        $scope.getWords();
      });
    };

    $scope.checkAllCheckboxes = function (field) {
      for (var i = 0; i < field.length; i++) {
        field[i].checked = true;
      }
    };

    $scope.unCheckAllCheckboxes = function (field) {
      for (var i = 0; i < field.length; i++) {
        field[i].checked = false;
      }
    };

    $scope.isChecked = false;
    $scope.studentChecked = false;

    $scope.allCheckedWords = function (object) {
      object.value = !object.value;
      if (object.value == !$scope.isChecked) {
        console.log('true');
        $scope.checkedWords.push(object.words);
        console.log(object.words);
      }
      else if (object.value == false) {
        console.log("false");
      }
    };

// This was showing the array for a bit so I do think its finally getting into the array, but something with the if
    // statement is screwing it up. when it was working it only did the first thing clicked
    $scope.pushWordsToStudents = function () {
      //console.log("before the for statement in the pushWordsToStudents function");
      console.log($scope.students);  // this is showing object, object, object...     PROBLEM!!!!!!!!!!!!!!!
      console.log($scope.checkedWords);
      // this  is correctly shows all checked words in an array. it doesnt get rid of words when unchecked from the checked words array. but it also doesnt duplicate
      console.log($scope.checkedStudents);
      //this is correctly showing all checked students in an array. doesnt get rid of unchecked students but doesnt duplicate
      for (var i = 0; i < $scope.students.length; i++) {
        //console.log("after the first for statement in the pushWordsToStudents function");
        for (var j = 0; j < $scope.checkedStudents.length; j++) {
          //console.log("after the second statement in the pushWordsToStudents function");
          for (var k = 0; k < $scope.checkedWords.length; k++) {
            //console.log("after the third statement in the pushWordsToStudents function");
            if ($scope.students[i] == $scope.checkedStudents[j]) {
              console.log("after the if statement in the pushWordsToStudents function");
              $scope.students[i].studentWordArray.push($scope.checkedWords[k]);
              console.log($scope.students[i].studentWordArray);
            }
          }
        }
      }
    };


      //maybe we could make it so that we walk through the student array, see which ones match the checked ones in
      //name and then be like push that to those students in the student array


      //for(var i = 0; i < $scope.checkedStudents.length; i++){
      //  for(var j = 0; j <  $scope.checkedWords.length; j++ ) {
      //    console.log( $scope.checkedStudents[i]);
      //    console.log($scope.checkedWords[j]);
      //    $scope.checkedStudents[i].students.studentWordArray.push($scope.checkedWords[j]);
    //}
 // }

//================================================================================================
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
    $scope.makeCheckedStudentALegitStudent = function(){
      for(var i = 0; i < $scope.checkedStudents.length; i++){

        }
      };
    $scope.filterText = null;
    $rootScope.currentStudent = null;


    $http.get('/api/students').success(function(students) {
      $scope.students = students;
      socket.syncUpdates('student', $scope.students);
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
