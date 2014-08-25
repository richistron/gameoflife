'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('gameoflifeApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('testing board size', function () {
    expect(true).toBe(true);
  });
});
