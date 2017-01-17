

var myApp = angular.module( 'myApp', [] );

myApp.controller( 'mainController', ['$scope', '$http', function($scope, $http){
  console.log("NG");

  $http({
    method: 'GET',
    url: '/foodOptions'
  }).then(function(response){
    console.log(response.data);
    $scope.foodCategories = response.data;
  });// end http

  $scope.regester = function(){
    if (!$scope.nameIn || !$scope.categoryIn){
      alert('Fill out everything, please ;)');
      return;
    }; // end if
    $scope.nameIn = null;
    $scope.categoryIn = null;
  }
}]);// end mainController
