/*jslint browser:true, indent:2*/

/*global suite, test, suiteSetup, setup, suiteTeardown, teardown*/ // Mocha
/*global assert, chai*/ // Chai
/*global $*/ // jQuery

﻿(function () {
  'use strict';

  // http://api.jquery.com/category/manipulation/

  suite('jQuery manipulation methods', function () {
    var fixture, fixture$, unknown;

    setup(function () {
      unknown = '<unknown></unknown>';

      fixture = document.createElement('div');
      fixture.setAttribute('id', 'fixture');
      fixture.setAttribute('class', 'abc');
      document.body.appendChild(fixture);

      fixture$ = $('#fixture');
    });

    suite('safe methods that set a string', function () {
      [
        'addClass',
        'hasClass',
        'removeClass',
        'toggleClass'
      ].forEach(function (method) {
        test('jQuery.fn.' + method, function () {
          assert.doesNotThrow(function () {
            fixture$[method].call(fixture$, 'abc');
            fixture$[method].call(fixture$, 'def');
          });
        });
      });

      (function (method) {
        test('jQuery.fn.' + method, function () {
          assert.doesNotThrow(function () {
            fixture$[method].call(fixture$, 'abc');
          });
          assert.equal('abc', fixture$.text());
        });
      }('text'));

      (function (method) {
        var input$;
        input$ = $('<input type="text" />');
        test('jQuery.fn.' + method, function () {
          assert.doesNotThrow(function () {
            input$[method].call(input$, 'abc');
          });
          assert.equal('abc', input$.val());
        });
      }('val'));
    });

    suite('safe methods that set a number', function () {
      [
        'height',
        'innerHeight',
        'innerWidth',
        'width'
      ].forEach(function (method) {
        test('jQuery.fn.' + method, function () {
          assert.doesNotThrow(function () {
            fixture$[method].call(fixture$, 20);
          });
          assert.equal(20, fixture$[method].call(fixture$));
        });
      });
    });

    suite('unsafe methods that set innerHTML', function () {

      [
        'append',
        'html',
        'prepend'
      ].forEach(function (method) {
        test('jQuery.fn.' + method, function () {
          assert.doesNotThrow(function () {
            fixture$[method].call(fixture$, unknown);
          });
          assert.equal(unknown, fixture.innerHTML);
        });
      });

      [
        'appendTo',
        'prependTo'
      ].forEach(function (method) {
        test('jQuery.fn.' + method, function () {
          var unknown$;
          unknown$ = $(unknown);
          assert.doesNotThrow(function () {
            unknown$[method].call(unknown$, fixture$);
          });
          assert.equal(unknown, fixture.innerHTML);
        });
      });

    });

    suite('unsafe methods that affect parent\'s innerHTML', function () {
      var target, target$;

      setup(function () {
        target = document.createElement('div');
        target.setAttribute('id', 'target');
        fixture.appendChild(target);

        target$ = $('#target');
      });

      [
        'after',
        'before',
        'wrap',
        'wrapAll'
      ].forEach(function (method) {
        test('jQuery.fn.' + method, function () {
          assert.doesNotThrow(function () {
            target$[method].call(target$, unknown);
          });
          target$.remove();
          assert.equal(unknown, fixture.innerHTML);
        });
      });

      (function (method) {
        test('jQuery.fn.' + method, function () {
          assert.doesNotThrow(function () {
            fixture$[method].call(fixture$, unknown);
          });
          target$.remove();
          assert.equal(unknown, fixture.innerHTML);
        });
      }('wrapInner'));

      [
        'insertAfter',
        'insertBefore'
      ].forEach(function (method) {
        test('jQuery.fn.' + method, function () {
          var unknown$;
          unknown$ = $(unknown);
          assert.doesNotThrow(function () {
            unknown$[method].call(unknown$, target$);
          });
          target$.remove();
          assert.equal(unknown, fixture.innerHTML);
        });
      });

      teardown(function () {
        target = null;
        target$ = null;
        MSApp.execUnsafeLocalFunction(function () {
          fixture.innerHTML = '';
        });
      });
    });

    suite('safe methods that affect parent\'s innerHTML', function () {
      var target, target$;

      setup(function () {
        target = document.createElement('div');
        target.setAttribute('id', 'target');
        fixture.appendChild(target);

        target$ = $('#target');
      });

      [
        'detach',
        'remove'
      ].forEach(function (method) {
        test('jQuery.fn.' + method, function () {
          assert.doesNotThrow(function () {
            target$[method].call(target$);
          });
          assert.ok(!target.parentNode, 'div no longer has a parent');
          assert.equal('', fixture.innerHTML);
        });
      });

      (function (method) {
        test('jQuery.fn.' + method, function () {
          assert.doesNotThrow(function () {
            fixture$[method].call(fixture$);
          });
          assert.equal('', fixture.innerHTML);
        });
      }('empty'));

      (function (method) {
        test('jQuery.fn.' + method, function () {
          var div, div$;
          div = document.createElement('div');
          fixture.appendChild(div);
          div.appendChild(target);
          console.log(fixture.innerHTML);
          assert.doesNotThrow(function () {
            target$[method].call(target$);
          });
          console.log(fixture.innerHTML);
          assert.ok(!div.parentNode, 'intermediate div no longer has a parent');
          assert.equal(target.outerHTML, fixture.innerHTML);
        });
      }('unwrap'));

      teardown(function () {
        target = null;
        target$ = null;
        MSApp.execUnsafeLocalFunction(function () {
          fixture.innerHTML = '';
        });
      });
    });

    [
      'attr',
      'clone',
      'css',
      'offset',
      'outerHeight',
      'outerWidth',
      'position',
      'prop',
      'removeAttr',
      'removeProp',
      'replaceAll',
      'replaceWith',
      'scrollLeft',
      'scrollTop'
    ].forEach(function (method) {
      test('jQuery.fn.' + method);
    });

    teardown(function () {
      if (fixture && fixture.parentNode) {
        fixture.parentNode.removeChild(fixture);
        fixture = null;
        fixture$ = null;
      }
    });

  });

}());
