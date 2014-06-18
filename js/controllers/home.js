app.controller('HomeController', ['$scope', function($scope){

  'use strict';

  $scope.showIntro = false;

  /**
   * Actions to perform on page initialization.
   */
  $scope.init = function() {

    $scope.appInitialized = true;
  };
}]);