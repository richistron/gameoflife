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
    var newGenaration = $scope.createGeneration();
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
    $scope.drawBoard();
  };
  /**
   * Draw Board
   */
  $scope.drawBoard = function(){
    var
    canvas = document.getElementById('gameBoardCanvas') || document.createElement('canvas'),
    canvasContext = canvas.getContext('2d');
    canvasContext.strokeStyle = '#333';
    canvasContext.fillStyle = '#2a9eea';
    canvasContext.clearRect(0, 0, 720, 720);
    _.each($scope.currentGeneration, function(row, _y_) {
        _.each(row, function(item, _x_) {
            canvasContext.beginPath();
            canvasContext.rect(_x_ * 8, _y_ * 8, 8, 8);
            if (item) {
                canvasContext.fill();
            } else {
                canvasContext.stroke();
            }
        });
    });
  };
  /**
   * Return count of existing neighbours
   * @return {Array} [Can return array or undefined]
   **/
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
   * Return count of alive neighbours
   **/
  $scope.getAllNeighbours = function(y, x) {
    y = parseInt(y);
    x = parseInt(x);
    var
    aliveNeighbours,
    neighbours = [],
    addNeighbour = function(n,m,collection, args){
      if ($scope.getNeighbour(n,m, args) !== undefined) {
        collection.push($scope.getNeighbour(n,m, args));
      }
      return collection;
    };
    // top neighbours
    neighbours = addNeighbour(-1,-1, neighbours, arguments);
    neighbours = addNeighbour(-1,0, neighbours, arguments);
    neighbours = addNeighbour(-1,1, neighbours, arguments);
    // mid neighbours
    neighbours = addNeighbour(0,-1, neighbours, arguments);
    neighbours = addNeighbour(0,1, neighbours, arguments);
    // bot neighbours
    neighbours = addNeighbour(1,-1, neighbours, arguments);
    neighbours = addNeighbour(1,0, neighbours, arguments);
    neighbours = addNeighbour(1,1, neighbours, arguments);
    aliveNeighbours = _.filter(neighbours, function(item) {
      return (item === true);
    });
    return aliveNeighbours.length;
  };
  /**
   * Evolution timeout
   **/
  $scope.itsAlive = function(time) {
    time = time || 1000;
    $scope.drawBoard();
    setTimeout(function() {
      $scope.isEvolutionBaby();
      $scope.itsAlive(time);
    }, time);
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
    $scope.itsAlive(2000);
  })();
});
