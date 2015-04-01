'use strict';

angular.module('WordRiverApp')
  .controller('AddingWordsCtrl', function ($rootScope, $scope, $http, socket) {
    $scope.currentWords = [];
    $scope.allWords = [];

    $scope.checkedWords = [];
    $scope.checkedStudents = [];

    $scope.wordField = "";

    //added the toSort value and order value that the sort ALphabetically functionality needed
    $scope.toSort = "words";
    $scope.order = true;
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
      if ($scope.wordField.length >= 1) {
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
        for(var i = 0; i < $scope.checkedWords.length; i++){
          if(object.words == $scope.checkedWords[i]){
            $scope.checkedWords.splice(i, 1);
          }
        }
        console.log("false");

           //pop off the end, not what we want
      }
    };

    // I'm not sure if it is sticking in the database but it is getting to the studentWordArray now and pushing the words in there.
    // big problem is that it does allow duplicate words to be entered into the studentWordArray (I tried to fix this at one point but
    //it wouldnt continue through the function. I may have done it wrong.
    //http://www.w3schools.com/jsref/jsref_string.asp
    //http://stackoverflow.com/questions/3473639/best-way-to-convert-string-to-array-of-object-in-javascript
    //http://stackoverflow.com/questions/5612787/converting-an-object-to-a-string

    $scope.pushWordsToStudents = function () {
      //console.log("before the for statement in the pushWordsToStudents function");
      console.log($scope.students);
      console.log($scope.checkedWords);
               // if you uncheck something it gets rid of the whole array which is a problem. doesn't duplicate
      console.log($scope.checkedStudents);
               //if you uncheck something it gets rid of the whole array which is a problem. doesn't duplicate
      for (var i = 0; i < $scope.students.length; i++) {
        //console.log("after the first for statement in the pushWordsToStudents function");
        var name = $scope.students[i].firstName + " " + $scope.students[i].lastName;
        for (var j = 0; j < $scope.checkedStudents.length; j++) {
          //console.log("after the second statement in the pushWordsToStudents function");
          if (name == ($scope.checkedStudents[j])) {
             //for (var k = 0; k < $scope.checkedWords.length; k++) {
            for (var k = 0; k < $scope.checkedWords.length; k++) {

              $scope.preventDuplication($scope.students[i].studentWordArray, $scope.checkedWords[k]);
              console.log($scope.checkedStudents[j] + " <- checked student, student -> " + $scope.students[i] + " This is the student word array part!!!!!!!!!!!!      " + $scope.students[i].studentWordArray);

            }
          }
        }
      }
    };

    $scope.preventDuplication = function(array, item) {
      if(array.indexOf(item) == -1) {
        array.push(item)
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
          for(var i = 0 ; i < $scope.checkedStudents.length; i++) {
            if ($scope.checkedStudents[i] == object.student) {
              $scope.checkedStudents.splice(i, 1);    // same problem with the allCheckedWords above.
            }
          }
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
