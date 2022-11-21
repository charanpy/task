define('ember-ajax/services/ajax', ['exports', 'ember-ajax/mixins/ajax-request'], function (exports, _ajaxRequest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AjaxServiceClass = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var AjaxService = Ember.Service.extend(_ajaxRequest.default);
  exports.default = AjaxService;

  var AjaxServiceClass = exports.AjaxServiceClass = function (_AjaxService) {
    _inherits(AjaxServiceClass, _AjaxService);

    function AjaxServiceClass() {
      _classCallCheck(this, AjaxServiceClass);

      return _possibleConstructorReturn(this, (AjaxServiceClass.__proto__ || Object.getPrototypeOf(AjaxServiceClass)).apply(this, arguments));
    }

    return AjaxServiceClass;
  }(AjaxService);
});