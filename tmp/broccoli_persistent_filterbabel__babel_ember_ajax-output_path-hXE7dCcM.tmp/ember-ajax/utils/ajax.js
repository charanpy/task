define('ember-ajax/utils/ajax', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ajax = typeof FastBoot === 'undefined' ? Ember.$.ajax : FastBoot.require('najax');
  exports.default = ajax;
});