/*global _:true */
'use strict';

/**
 * @ngdoc function
 * @name gameoflifeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gameoflifeApp
 */
angular.module('gameoflifeApp').controller('MainCtrl', function ($scope) {
  /**
   * Creates an empty generation array
   * All cells are dead by default
   **/
  $scope.createGeneration = function() {
    var x,y,
    generation = {};
    for (y = 0; y < $scope.boardSize; y++) {
      generation[y] = {};
      for (x = 0; x < $scope.boardSize; x++) {
        generation[y][x] = false;
      }
    }
    return generation;
  };
  /**
   * Evolution
   * Loop all over the items and apply game rules
   * Render new Generation
   **/
  $scope.isEvolutionBaby = function() {
    var
    canvas = document.getElementById('gameBoardCanvas').getContext('2d'),
    newGenaration = $scope.createGeneration();
    _.each($scope.currentGeneration, function(itemY, y) {
      _.each($scope.currentGeneration[y], function(itemX, x){
        var neighbours = $scope.getAllNeighbours(y, x);
        if ($scope.currentGeneration[y][x] === false) {
          newGenaration[y][x] = neighbours === 2 || neighbours === 3 ? true : false;
        } else {
          newGenaration[y][x] = neighbours === 3 ? true : false;
        }

      });
    });
    $scope.currentGeneration = _.clone(newGenaration);
    canvas.strokeStyle = '#333';
    canvas.fillStyle = '#2a9eea';
    canvas.clearRect(0, 0, 720, 720);
    _.each($scope.currentGeneration, function(row, _y_) {
        _.each(row, function(item, _x_) {
            canvas.beginPath();
            canvas.rect(_x_ * 8, _y_ * 8, 8, 8);
            if (item) {
                canvas.fill();
            } else {
                canvas.stroke();
            }
        });
    });
  };
  $scope.getNeighbour = function(k, j, position){
    k = (k) + (parseInt(position[0]));
    j = (j) + (parseInt(position[1]));
    if (k < 0 && j < 0) {
      return;
    }
    if ($scope.currentGeneration[k] && $scope.currentGeneration[k][j] !== undefined) {
      return _.clone($scope.currentGeneration[k][j]);
    }
  };
  /**
   * Check if lives on next generation
   **/
  $scope.getAllNeighbours = function(y, x) {
    y = parseInt(y);
    x = parseInt(x);
    var
    aliveNeighbours,
    neighbours = [];
    // get neighbours
    if ($scope.getNeighbour(-1,-1, arguments) !== undefined) {
      neighbours.push($scope.getNeighbour(-1,-1, arguments));
    }
    if ($scope.getNeighbour(-1,0, arguments) !== undefined) {
      neighbours.push($scope.getNeighbour(-1,0, arguments));
    }
    if ($scope.getNeighbour(-1,1, arguments) !== undefined) {
      neighbours.push($scope.getNeighbour(-1,1, arguments));
    }
    //
    if ($scope.getNeighbour(0,-1, arguments) !== undefined) {
      neighbours.push($scope.getNeighbour(0,-1, arguments));
    }
    if ($scope.getNeighbour(0,1, arguments) !== undefined) {
      neighbours.push($scope.getNeighbour(0,1, arguments));
    }
    //
    if ($scope.getNeighbour(1,-1, arguments) !== undefined) {
      neighbours.push($scope.getNeighbour(1,-1, arguments));
    }
    if ($scope.getNeighbour(1,0, arguments) !== undefined) {
      neighbours.push($scope.getNeighbour(1,0, arguments));
    }
    if ($scope.getNeighbour(1,1, arguments) !== undefined) {
      neighbours.push($scope.getNeighbour(1,1, arguments));
    }
    aliveNeighbours = _.filter(neighbours, function(item) {
      return (item === true);
    });
    return aliveNeighbours.length;
  };
  /**
   * Evolution timeout
   **/
  $scope.itsAlive = function() {
    setTimeout(function() {
      $scope.isEvolutionBaby();
      $scope.itsAlive();
    }, 2000);
  };
  /**
   * Constructor
   * Plase for default values
   * */
  (function(){
    // board size
    $scope.boardSize = 64;
    $scope.currentGeneration = $scope.createGeneration();
    $scope.nextGeneration = null;
    // first generation
    $scope.currentGeneration[32][32] = true;
    $scope.currentGeneration[32][33] = true;
    $scope.currentGeneration[33][32] = true;
    $scope.currentGeneration[33][33] = true;

    // start evolution
    $scope.itsAlive();
  })();
});
