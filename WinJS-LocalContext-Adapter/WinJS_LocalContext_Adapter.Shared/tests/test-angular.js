/*jslint browser:true, indent:2*/

/*global suite, test, suiteSetup, setup, suiteTeardown, teardown*/ // Mocha
/*global assert, chai*/ // Chai
/*global $*/ // jQuery
/*global angular*/ // Angular

﻿(function () {
  'use strict';

  var app;

  app = angular.module('app', []);

  app.directive('counter', [
    function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<button ng-click="increment()">{{count}}</button>',
        scope: true,
        link: function ($scope) {
          $scope.count = 0;
          $scope.increment = function () {
            $scope.count += 1;
          };
        }
      }
    }
  ]);

  suite('Angular.JS', function () {
    var fixture$;

    suiteSetup(function () {
      $(document.body).append('<counter id="angular-fixture"></counter>');
      angular.bootstrap(document.body, ['app']);
      fixture$ = $('#angular-fixture');
    });

    test('initial directive state is correct', function () {
      assert.isTrue(fixture$.hasClass('ng-scope'));
      assert.equal(fixture$.text(), '0');
    });

    test('directive reacts as expected to events', function () {
      fixture$.trigger('click');
      assert.equal(fixture$.text(), '1');
    });

  });

}());
