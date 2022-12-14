define('ember-ajax/-private/promise', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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

    var AJAXPromise = function (_Ember$RSVP$Promise) {
        _inherits(AJAXPromise, _Ember$RSVP$Promise);

        // NOTE: Only necessary due to broken definition of RSVP.Promise
        // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/26640
        function AJAXPromise(executor, label) {
            _classCallCheck(this, AJAXPromise);

            return _possibleConstructorReturn(this, (AJAXPromise.__proto__ || Object.getPrototypeOf(AJAXPromise)).call(this, executor, label));
        }
        /**
         * Overriding `.then` to add XHR to child promise
         */


        _createClass(AJAXPromise, [{
            key: 'then',
            value: function then(onFulfilled, onRejected, label) {
                var child = _get(AJAXPromise.prototype.__proto__ || Object.getPrototypeOf(AJAXPromise.prototype), 'then', this).call(this, onFulfilled, onRejected, label);
                child.xhr = this.xhr;
                return child;
            }
        }]);

        return AJAXPromise;
    }(Ember.RSVP.Promise);

    exports.default = AJAXPromise;
});