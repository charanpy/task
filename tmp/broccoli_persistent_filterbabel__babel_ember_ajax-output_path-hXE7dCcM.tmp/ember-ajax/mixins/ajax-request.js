define('ember-ajax/mixins/ajax-request', ['exports', 'ember-ajax/errors', 'ember-ajax/utils/ajax', 'ember-ajax/-private/utils/parse-response-headers', 'ember-ajax/-private/utils/get-header', 'ember-ajax/-private/utils/url-helpers', 'ember-ajax/-private/utils/is-string', 'ember-ajax/-private/promise'], function (exports, _errors, _ajax, _parseResponseHeaders, _getHeader, _urlHelpers, _isString, _promise) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var Test = Ember.Test;

    var JSONContentType = /^application\/(?:vnd\.api\+)?json/i;
    function isJSONContentType(header) {
        if (!(0, _isString.default)(header)) {
            return false;
        }
        return !!header.match(JSONContentType);
    }
    function isJSONStringifyable(method, _ref) {
        var contentType = _ref.contentType,
            data = _ref.data,
            headers = _ref.headers;

        if (method === 'GET') {
            return false;
        }
        if (!isJSONContentType(contentType) && !isJSONContentType((0, _getHeader.default)(headers, 'Content-Type'))) {
            return false;
        }
        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
            return false;
        }
        return true;
    }
    function startsWithSlash(string) {
        return string.charAt(0) === '/';
    }
    function endsWithSlash(string) {
        return string.charAt(string.length - 1) === '/';
    }
    function removeLeadingSlash(string) {
        return string.substring(1);
    }
    function stripSlashes(path) {
        // make sure path starts with `/`
        if (startsWithSlash(path)) {
            path = removeLeadingSlash(path);
        }
        // remove end `/`
        if (endsWithSlash(path)) {
            path = path.slice(0, -1);
        }
        return path;
    }
    var pendingRequestCount = 0;
    if (Ember.testing) {
        Test.registerWaiter(function () {
            return pendingRequestCount === 0;
        });
    }
    /**
     * AjaxRequest Mixin
     */
    exports.default = Ember.Mixin.create({
        /**
         * The default value for the request `contentType`
         *
         * For now, defaults to the same value that jQuery would assign.  In the
         * future, the default value will be for JSON requests.
         * @property {string} contentType
         * @public
         */
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        /**
         * Headers to include on the request
         *
         * Some APIs require HTTP headers, e.g. to provide an API key. Arbitrary
         * headers can be set as key/value pairs on the `RESTAdapter`'s `headers`
         * object and Ember Data will send them along with each ajax request.
         *
         * ```javascript
         * // app/services/ajax.js
         * import AjaxService from 'ember-ajax/services/ajax';
         *
         * export default AjaxService.extend({
         *   headers: {
         *     'API_KEY': 'secret key',
         *     'ANOTHER_HEADER': 'Some header value'
         *   }
         * });
         * ```
         *
         * `headers` can also be used as a computed property to support dynamic
         * headers.
         *
         * ```javascript
         * // app/services/ajax.js
         * import Ember from 'ember';
         * import AjaxService from 'ember-ajax/services/ajax';
         *
         * const {
         *   computed,
         *   get,
         *   inject: { service }
         * } = Ember;
         *
         * export default AjaxService.extend({
         *   session: service(),
         *   headers: computed('session.authToken', function() {
         *     return {
         *       'API_KEY': get(this, 'session.authToken'),
         *       'ANOTHER_HEADER': 'Some header value'
         *     };
         *   })
         * });
         * ```
         *
         * In some cases, your dynamic headers may require data from some object
         * outside of Ember's observer system (for example `document.cookie`). You
         * can use the `volatile` function to set the property into a non-cached mode
         * causing the headers to be recomputed with every request.
         *
         * ```javascript
         * // app/services/ajax.js
         * import Ember from 'ember';
         * import AjaxService from 'ember-ajax/services/ajax';
         *
         * const {
         *   computed,
         *   get,
         *   inject: { service }
         * } = Ember;
         *
         * export default AjaxService.extend({
         *   session: service(),
         *   headers: computed('session.authToken', function() {
         *     return {
         *       'API_KEY': get(document.cookie.match(/apiKey\=([^;]*)/), '1'),
         *       'ANOTHER_HEADER': 'Some header value'
         *     };
         *   }).volatile()
         * });
         * ```
         *
         * @property {Headers} headers
         * @public
         */
        headers: undefined,
        /**
         * @property {string} host
         * @public
         */
        host: undefined,
        /**
         * @property {string} namespace
         * @public
         */
        namespace: undefined,
        /**
         * @property {Matcher[]} trustedHosts
         * @public
         */
        trustedHosts: undefined,
        /**
         * Make an AJAX request, ignoring the raw XHR object and dealing only with
         * the response
         */
        request: function request(url, options) {
            var hash = this.options(url, options);
            var internalPromise = this._makeRequest(hash);
            var ajaxPromise = new _promise.default(function (resolve, reject) {
                internalPromise.then(function (_ref2) {
                    var response = _ref2.response;

                    resolve(response);
                }).catch(function (_ref3) {
                    var response = _ref3.response;

                    reject(response);
                });
            }, 'ember-ajax: ' + hash.type + ' ' + hash.url + ' response');
            ajaxPromise.xhr = internalPromise.xhr;
            return ajaxPromise;
        },

        /**
         * Make an AJAX request, returning the raw XHR object along with the response
         */
        raw: function raw(url, options) {
            var hash = this.options(url, options);
            return this._makeRequest(hash);
        },

        /**
         * Shared method to actually make an AJAX request
         */
        _makeRequest: function _makeRequest(hash) {
            var _this = this;

            var method = hash.method || hash.type || 'GET';
            var requestData = { method: method, type: method, url: hash.url };
            if (isJSONStringifyable(method, hash)) {
                hash.data = JSON.stringify(hash.data);
            }
            pendingRequestCount = pendingRequestCount + 1;
            var jqXHR = (0, _ajax.default)(hash.url, hash);
            var promise = new _promise.default(function (resolve, reject) {
                jqXHR.done(function (payload, textStatus, jqXHR) {
                    var response = _this.handleResponse(jqXHR.status, (0, _parseResponseHeaders.default)(jqXHR.getAllResponseHeaders()), payload, requestData);
                    if ((0, _errors.isAjaxError)(response)) {
                        var rejectionParam = {
                            payload: payload,
                            textStatus: textStatus,
                            jqXHR: jqXHR,
                            response: response
                        };
                        Ember.run.join(null, reject, rejectionParam);
                    } else {
                        var resolutionParam = {
                            payload: payload,
                            textStatus: textStatus,
                            jqXHR: jqXHR,
                            response: response
                        };
                        Ember.run.join(null, resolve, resolutionParam);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    Ember.runInDebug(function () {
                        var message = 'The server returned an empty string for ' + requestData.type + ' ' + requestData.url + ', which cannot be parsed into a valid JSON. Return either null or {}.';
                        var validJSONString = !(textStatus === 'parsererror' && jqXHR.responseText === '');
                        (true && Ember.warn(message, validJSONString, {
                            id: 'ds.adapter.returned-empty-string-as-JSON'
                        }));
                    });
                    var payload = _this.parseErrorResponse(jqXHR.responseText) || errorThrown;
                    var response = void 0;
                    if (textStatus === 'timeout') {
                        response = new _errors.TimeoutError();
                    } else if (textStatus === 'abort') {
                        response = new _errors.AbortError();
                    } else {
                        response = _this.handleResponse(jqXHR.status, (0, _parseResponseHeaders.default)(jqXHR.getAllResponseHeaders()), payload, requestData);
                    }
                    var rejectionParam = {
                        payload: payload,
                        textStatus: textStatus,
                        jqXHR: jqXHR,
                        errorThrown: errorThrown,
                        response: response
                    };
                    Ember.run.join(null, reject, rejectionParam);
                }).always(function () {
                    pendingRequestCount = pendingRequestCount - 1;
                });
            }, 'ember-ajax: ' + hash.type + ' ' + hash.url);
            promise.xhr = jqXHR;
            return promise;
        },

        /**
         * calls `request()` but forces `options.type` to `POST`
         */
        post: function post(url, options) {
            return this.request(url, this._addTypeToOptionsFor(options, 'POST'));
        },

        /**
         * calls `request()` but forces `options.type` to `PUT`
         */
        put: function put(url, options) {
            return this.request(url, this._addTypeToOptionsFor(options, 'PUT'));
        },

        /**
         * calls `request()` but forces `options.type` to `PATCH`
         */
        patch: function patch(url, options) {
            return this.request(url, this._addTypeToOptionsFor(options, 'PATCH'));
        },

        /**
         * calls `request()` but forces `options.type` to `DELETE`
         */
        del: function del(url, options) {
            return this.request(url, this._addTypeToOptionsFor(options, 'DELETE'));
        },

        /**
         * calls `request()` but forces `options.type` to `DELETE`
         *
         * Alias for `del()`
         */
        delete: function _delete(url, options) {
            return this.del(url, options);
        },

        /**
         * Wrap the `.get` method so that we issue a warning if
         *
         * Since `.get` is both an AJAX pattern _and_ an Ember pattern, we want to try
         * to warn users when they try using `.get` to make a request
         */
        get: function get(url) {
            if (arguments.length > 1 || url.indexOf('/') !== -1) {
                throw new Ember.Error('It seems you tried to use `.get` to make a request! Use the `.request` method instead.');
            }
            return this._super.apply(this, arguments);
        },

        /**
         * Manipulates the options hash to include the HTTP method on the type key
         */
        _addTypeToOptionsFor: function _addTypeToOptionsFor(options, method) {
            options = options || {};
            options.type = method;
            return options;
        },

        /**
         * Get the full "headers" hash, combining the service-defined headers with
         * the ones provided for the request
         */
        _getFullHeadersHash: function _getFullHeadersHash(headers) {
            var classHeaders = Ember.get(this, 'headers');
            return Ember.assign({}, classHeaders, headers);
        },

        /**
         * Created a normalized set of options from the per-request and
         * service-level settings
         */
        options: function options(url) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            options = Ember.assign({}, options);
            options.url = this._buildURL(url, options);
            options.type = options.type || 'GET';
            options.dataType = options.dataType || 'json';
            options.contentType = Ember.isEmpty(options.contentType) ? Ember.get(this, 'contentType') : options.contentType;
            if (this._shouldSendHeaders(options)) {
                options.headers = this._getFullHeadersHash(options.headers);
            } else {
                options.headers = options.headers || {};
            }
            return options;
        },

        /**
         * Build a URL for a request
         *
         * If the provided `url` is deemed to be a complete URL, it will be returned
         * directly.  If it is not complete, then the segment provided will be combined
         * with the `host` and `namespace` options of the request class to create the
         * full URL.
         */
        _buildURL: function _buildURL(url) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if ((0, _urlHelpers.isFullURL)(url)) {
                return url;
            }
            var urlParts = [];
            var host = options.host || Ember.get(this, 'host');
            if (host) {
                host = stripSlashes(host);
            }
            urlParts.push(host);
            var namespace = options.namespace || Ember.get(this, 'namespace');
            if (namespace) {
                namespace = stripSlashes(namespace);
                urlParts.push(namespace);
            }
            // If the URL has already been constructed (presumably, by Ember Data), then we should just leave it alone
            var hasNamespaceRegex = new RegExp('^(/)?' + namespace + '/');
            if (namespace && hasNamespaceRegex.test(url)) {
                return url;
            }
            // *Only* remove a leading slash -- we need to maintain a trailing slash for
            // APIs that differentiate between it being and not being present
            if (startsWithSlash(url)) {
                url = removeLeadingSlash(url);
            }
            urlParts.push(url);
            return urlParts.join('/');
        },

        /**
         * Takes an ajax response, and returns the json payload or an error.
         *
         * By default this hook just returns the json payload passed to it.
         * You might want to override it in two cases:
         *
         * 1. Your API might return useful results in the response headers.
         *    Response headers are passed in as the second argument.
         *
         * 2. Your API might return errors as successful responses with status code
         *    200 and an Errors text or object.
         */
        handleResponse: function handleResponse(status, headers, payload, requestData) {
            if (this.isSuccess(status, headers, payload)) {
                return payload;
            }
            // Allow overriding of error payload
            payload = this.normalizeErrorResponse(status, headers, payload);
            return this._createCorrectError(status, headers, payload, requestData);
        },
        _createCorrectError: function _createCorrectError(status, headers, payload, requestData) {
            var error = void 0;
            if (this.isUnauthorizedError(status, headers, payload)) {
                error = new _errors.UnauthorizedError(payload);
            } else if (this.isForbiddenError(status, headers, payload)) {
                error = new _errors.ForbiddenError(payload);
            } else if (this.isInvalidError(status, headers, payload)) {
                error = new _errors.InvalidError(payload);
            } else if (this.isBadRequestError(status, headers, payload)) {
                error = new _errors.BadRequestError(payload);
            } else if (this.isNotFoundError(status, headers, payload)) {
                error = new _errors.NotFoundError(payload);
            } else if (this.isGoneError(status, headers, payload)) {
                error = new _errors.GoneError(payload);
            } else if (this.isAbortError(status, headers, payload)) {
                error = new _errors.AbortError();
            } else if (this.isConflictError(status, headers, payload)) {
                error = new _errors.ConflictError(payload);
            } else if (this.isServerError(status, headers, payload)) {
                error = new _errors.ServerError(payload, status);
            } else {
                var detailedMessage = this.generateDetailedMessage(status, headers, payload, requestData);
                error = new _errors.AjaxError(payload, detailedMessage, status);
            }
            return error;
        },

        /**
         * Match the host to a provided array of strings or regexes that can match to a host
         */
        _matchHosts: function _matchHosts(host, matcher) {
            if (!(0, _isString.default)(host)) {
                return false;
            }
            if (matcher instanceof RegExp) {
                return matcher.test(host);
            } else if (typeof matcher === 'string') {
                return matcher === host;
            } else {
                console.warn('trustedHosts only handles strings or regexes. ', matcher, ' is neither.');
                return false;
            }
        },

        /**
         * Determine whether the headers should be added for this request
         *
         * This hook is used to help prevent sending headers to every host, regardless
         * of the destination, since this could be a security issue if authentication
         * tokens are accidentally leaked to third parties.
         *
         * To avoid that problem, subclasses should utilize the `headers` computed
         * property to prevent authentication from being sent to third parties, or
         * implement this hook for more fine-grain control over when headers are sent.
         *
         * By default, the headers are sent if the host of the request matches the
         * `host` property designated on the class.
         */
        _shouldSendHeaders: function _shouldSendHeaders(_ref4) {
            var _this2 = this;

            var url = _ref4.url,
                host = _ref4.host;

            url = url || '';
            host = host || Ember.get(this, 'host') || '';
            var trustedHosts = Ember.get(this, 'trustedHosts') || Ember.A();

            var _parseURL = (0, _urlHelpers.parseURL)(url),
                hostname = _parseURL.hostname;
            // Add headers on relative URLs


            if (!(0, _urlHelpers.isFullURL)(url)) {
                return true;
            } else if (trustedHosts.find(function (matcher) {
                return _this2._matchHosts(hostname, matcher);
            })) {
                return true;
            }
            // Add headers on matching host
            return (0, _urlHelpers.haveSameHost)(url, host);
        },

        /**
         * Generates a detailed ("friendly") error message, with plenty
         * of information for debugging (good luck!)
         */
        generateDetailedMessage: function generateDetailedMessage(status, headers, payload, requestData) {
            var shortenedPayload = void 0;
            var payloadContentType = (0, _getHeader.default)(headers, 'Content-Type') || 'Empty Content-Type';
            if (payloadContentType.toLowerCase() === 'text/html' && payload.length > 250) {
                shortenedPayload = '[Omitted Lengthy HTML]';
            } else {
                shortenedPayload = JSON.stringify(payload);
            }
            var requestDescription = requestData.type + ' ' + requestData.url;
            var payloadDescription = 'Payload (' + payloadContentType + ')';
            return ['Ember AJAX Request ' + requestDescription + ' returned a ' + status, payloadDescription, shortenedPayload].join('\n');
        },

        /**
         * Default `handleResponse` implementation uses this hook to decide if the
         * response is a an authorized error.
         */
        isUnauthorizedError: function isUnauthorizedError(status, _headers, _payload) {
            return (0, _errors.isUnauthorizedError)(status);
        },

        /**
         * Default `handleResponse` implementation uses this hook to decide if the
         * response is a forbidden error.
         */
        isForbiddenError: function isForbiddenError(status, _headers, _payload) {
            return (0, _errors.isForbiddenError)(status);
        },

        /**
         * Default `handleResponse` implementation uses this hook to decide if the
         * response is a an invalid error.
         */
        isInvalidError: function isInvalidError(status, _headers, _payload) {
            return (0, _errors.isInvalidError)(status);
        },

        /**
         * Default `handleResponse` implementation uses this hook to decide if the
         * response is a bad request error.
         */
        isBadRequestError: function isBadRequestError(status, _headers, _payload) {
            return (0, _errors.isBadRequestError)(status);
        },

        /**
         * Default `handleResponse` implementation uses this hook to decide if the
         * response is a "not found" error.
         */
        isNotFoundError: function isNotFoundError(status, _headers, _payload) {
            return (0, _errors.isNotFoundError)(status);
        },

        /**
         * Default `handleResponse` implementation uses this hook to decide if the
         * response is a "gone" error.
         */
        isGoneError: function isGoneError(status, _headers, _payload) {
            return (0, _errors.isGoneError)(status);
        },

        /**
         * Default `handleResponse` implementation uses this hook to decide if the
         * response is an "abort" error.
         */
        isAbortError: function isAbortError(status, _headers, _payload) {
            return (0, _errors.isAbortError)(status);
        },

        /**
         * Default `handleResponse` implementation uses this hook to decide if the
         * response is a "conflict" error.
         */
        isConflictError: function isConflictError(status, _headers, _payload) {
            return (0, _errors.isConflictError)(status);
        },

        /**
         * Default `handleResponse` implementation uses this hook to decide if the
         * response is a server error.
         */
        isServerError: function isServerError(status, _headers, _payload) {
            return (0, _errors.isServerError)(status);
        },

        /**
         * Default `handleResponse` implementation uses this hook to decide if the
         * response is a success.
         */
        isSuccess: function isSuccess(status, _headers, _payload) {
            return (0, _errors.isSuccess)(status);
        },
        parseErrorResponse: function parseErrorResponse(responseText) {
            try {
                return JSON.parse(responseText);
            } catch (e) {
                return responseText;
            }
        },
        normalizeErrorResponse: function normalizeErrorResponse(_status, _headers, payload) {
            return payload;
        }
    });
});