define('ember-ajax/errors', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.isAjaxError = isAjaxError;
    exports.isUnauthorizedError = isUnauthorizedError;
    exports.isForbiddenError = isForbiddenError;
    exports.isInvalidError = isInvalidError;
    exports.isBadRequestError = isBadRequestError;
    exports.isNotFoundError = isNotFoundError;
    exports.isGoneError = isGoneError;
    exports.isTimeoutError = isTimeoutError;
    exports.isAbortError = isAbortError;
    exports.isConflictError = isConflictError;
    exports.isServerError = isServerError;
    exports.isSuccess = isSuccess;

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

    var AjaxError = exports.AjaxError = function (_Ember$Error) {
        _inherits(AjaxError, _Ember$Error);

        function AjaxError(payload) {
            var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Ajax operation failed';
            var status = arguments[2];

            _classCallCheck(this, AjaxError);

            var _this = _possibleConstructorReturn(this, (AjaxError.__proto__ || Object.getPrototypeOf(AjaxError)).call(this, message));

            _this.payload = payload;
            _this.status = status;
            return _this;
        }

        return AjaxError;
    }(Ember.Error);

    var InvalidError = exports.InvalidError = function (_AjaxError) {
        _inherits(InvalidError, _AjaxError);

        function InvalidError(payload) {
            _classCallCheck(this, InvalidError);

            return _possibleConstructorReturn(this, (InvalidError.__proto__ || Object.getPrototypeOf(InvalidError)).call(this, payload, 'Request was rejected because it was invalid', 422));
        }

        return InvalidError;
    }(AjaxError);

    var UnauthorizedError = exports.UnauthorizedError = function (_AjaxError2) {
        _inherits(UnauthorizedError, _AjaxError2);

        function UnauthorizedError(payload) {
            _classCallCheck(this, UnauthorizedError);

            return _possibleConstructorReturn(this, (UnauthorizedError.__proto__ || Object.getPrototypeOf(UnauthorizedError)).call(this, payload, 'Ajax authorization failed', 401));
        }

        return UnauthorizedError;
    }(AjaxError);

    var ForbiddenError = exports.ForbiddenError = function (_AjaxError3) {
        _inherits(ForbiddenError, _AjaxError3);

        function ForbiddenError(payload) {
            _classCallCheck(this, ForbiddenError);

            return _possibleConstructorReturn(this, (ForbiddenError.__proto__ || Object.getPrototypeOf(ForbiddenError)).call(this, payload, 'Request was rejected because user is not permitted to perform this operation.', 403));
        }

        return ForbiddenError;
    }(AjaxError);

    var BadRequestError = exports.BadRequestError = function (_AjaxError4) {
        _inherits(BadRequestError, _AjaxError4);

        function BadRequestError(payload) {
            _classCallCheck(this, BadRequestError);

            return _possibleConstructorReturn(this, (BadRequestError.__proto__ || Object.getPrototypeOf(BadRequestError)).call(this, payload, 'Request was formatted incorrectly.', 400));
        }

        return BadRequestError;
    }(AjaxError);

    var NotFoundError = exports.NotFoundError = function (_AjaxError5) {
        _inherits(NotFoundError, _AjaxError5);

        function NotFoundError(payload) {
            _classCallCheck(this, NotFoundError);

            return _possibleConstructorReturn(this, (NotFoundError.__proto__ || Object.getPrototypeOf(NotFoundError)).call(this, payload, 'Resource was not found.', 404));
        }

        return NotFoundError;
    }(AjaxError);

    var GoneError = exports.GoneError = function (_AjaxError6) {
        _inherits(GoneError, _AjaxError6);

        function GoneError(payload) {
            _classCallCheck(this, GoneError);

            return _possibleConstructorReturn(this, (GoneError.__proto__ || Object.getPrototypeOf(GoneError)).call(this, payload, 'Resource is no longer available.', 410));
        }

        return GoneError;
    }(AjaxError);

    var TimeoutError = exports.TimeoutError = function (_AjaxError7) {
        _inherits(TimeoutError, _AjaxError7);

        function TimeoutError() {
            _classCallCheck(this, TimeoutError);

            return _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, null, 'The ajax operation timed out', -1));
        }

        return TimeoutError;
    }(AjaxError);

    var AbortError = exports.AbortError = function (_AjaxError8) {
        _inherits(AbortError, _AjaxError8);

        function AbortError() {
            _classCallCheck(this, AbortError);

            return _possibleConstructorReturn(this, (AbortError.__proto__ || Object.getPrototypeOf(AbortError)).call(this, null, 'The ajax operation was aborted', 0));
        }

        return AbortError;
    }(AjaxError);

    var ConflictError = exports.ConflictError = function (_AjaxError9) {
        _inherits(ConflictError, _AjaxError9);

        function ConflictError(payload) {
            _classCallCheck(this, ConflictError);

            return _possibleConstructorReturn(this, (ConflictError.__proto__ || Object.getPrototypeOf(ConflictError)).call(this, payload, 'The ajax operation failed due to a conflict', 409));
        }

        return ConflictError;
    }(AjaxError);

    var ServerError = exports.ServerError = function (_AjaxError10) {
        _inherits(ServerError, _AjaxError10);

        function ServerError(payload, status) {
            _classCallCheck(this, ServerError);

            return _possibleConstructorReturn(this, (ServerError.__proto__ || Object.getPrototypeOf(ServerError)).call(this, payload, 'Request was rejected due to server error', status));
        }

        return ServerError;
    }(AjaxError);

    /**
     * Checks if the given error is or inherits from AjaxError
     */
    function isAjaxError(error) {
        return error instanceof AjaxError;
    }
    /**
     * Checks if the given status code or AjaxError object represents an
     * unauthorized request error
     */
    function isUnauthorizedError(error) {
        if (isAjaxError(error)) {
            return error instanceof UnauthorizedError;
        } else {
            return error === 401;
        }
    }
    /**
     * Checks if the given status code or AjaxError object represents a forbidden
     * request error
     */
    function isForbiddenError(error) {
        if (isAjaxError(error)) {
            return error instanceof ForbiddenError;
        } else {
            return error === 403;
        }
    }
    /**
     * Checks if the given status code or AjaxError object represents an invalid
     * request error
     */
    function isInvalidError(error) {
        if (isAjaxError(error)) {
            return error instanceof InvalidError;
        } else {
            return error === 422;
        }
    }
    /**
     * Checks if the given status code or AjaxError object represents a bad request
     * error
     */
    function isBadRequestError(error) {
        if (isAjaxError(error)) {
            return error instanceof BadRequestError;
        } else {
            return error === 400;
        }
    }
    /**
     * Checks if the given status code or AjaxError object represents a "not found"
     * error
     */
    function isNotFoundError(error) {
        if (isAjaxError(error)) {
            return error instanceof NotFoundError;
        } else {
            return error === 404;
        }
    }
    /**
     * Checks if the given status code or AjaxError object represents a "gone"
     * error
     */
    function isGoneError(error) {
        if (isAjaxError(error)) {
            return error instanceof GoneError;
        } else {
            return error === 410;
        }
    }
    /**
     * Checks if the given object represents a "timeout" error
     */
    function isTimeoutError(error) {
        return error instanceof TimeoutError;
    }
    /**
     * Checks if the given status code or AjaxError object represents an
     * "abort" error
     */
    function isAbortError(error) {
        if (isAjaxError(error)) {
            return error instanceof AbortError;
        } else {
            return error === 0;
        }
    }
    /**
     * Checks if the given status code or AjaxError object represents a
     * conflict error
     */
    function isConflictError(error) {
        if (isAjaxError(error)) {
            return error instanceof ConflictError;
        } else {
            return error === 409;
        }
    }
    /**
     * Checks if the given status code or AjaxError object represents a server error
     */
    function isServerError(error) {
        if (isAjaxError(error)) {
            return error instanceof ServerError;
        } else {
            return error >= 500 && error < 600;
        }
    }
    /**
     * Checks if the given status code represents a successful request
     */
    function isSuccess(status) {
        var s = status;
        if (typeof status === 'string') {
            s = parseInt(status, 10);
        }
        return s >= 200 && s < 300 || s === 304;
    }
});