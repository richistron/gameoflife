'use strict';

/**
 * @ngdoc function
 * @name gameOfLifeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gameOfLifeApp
 */
angular.module('gameOfLifeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
