"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apicfg = _interopRequireDefault(require("./apicfg"));

var _projectx = require("@spark/projectx");

var _apiBase = require("@spark/api-base");

var _ui = require("@spark/ui");

var _duibaUtils = require("duiba-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mergeData = {
  user_type: _duibaUtils.newUser ? '0' : '1',
  is_from_share: _duibaUtils.isFromShare ? '0' : '1'
};

var apiList = _objectSpread({}, _apicfg["default"]);

var API = generateAPI(apiList);
var _default = API;
exports["default"] = _default;

function getRequestParams(value) {
  if (typeof value === 'string') {
    return {
      uri: value,
      method: 'get'
    };
  } else if (_typeof(value) === 'object') {
    var uri = value.uri,
        _value$method = value.method,
        method = _value$method === void 0 ? 'get' : _value$method,
        headers = value.headers,
        withToken = value.withToken,
        secret = value.secret,
        secretKey = value.secretKey,
        _value$contentType = value.contentType,
        contentType = _value$contentType === void 0 ? 'form' : _value$contentType,
        hideError = value.hideError;
    return {
      uri: uri,
      method: method,
      headers: headers,
      withToken: withToken,
      secret: secret,
      secretKey: secretKey,
      contentType: contentType,
      hideError: hideError
    };
  } else {
    console.error('getRequestParams: 传参有误');
  }
}

function generateAPI(apiList) {
  var api = {};

  var _loop = function _loop(key) {
    var value = apiList[key];

    var _getRequestParams = getRequestParams(value),
        method = _getRequestParams.method,
        uri = _getRequestParams.uri,
        mHeaders = _getRequestParams.headers,
        withToken = _getRequestParams.withToken,
        secret = _getRequestParams.secret,
        secretKey = _getRequestParams.secretKey,
        contentType = _getRequestParams.contentType,
        hideError = _getRequestParams.hideError;

    api[key] = function _callee() {
      var params,
          headers,
          token,
          mergedHeaders,
          result,
          _args = arguments;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              headers = _args.length > 1 ? _args[1] : undefined;

              if (!withToken) {
                _context.next = 14;
                break;
              }

              _context.prev = 3;
              _context.next = 6;
              return regeneratorRuntime.awrap((0, _projectx.getPxToken)());

            case 6:
              token = _context.sent;
              _context.next = 14;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](3);

              if (document.getElementById("overlay_layer")) {
                document.getElementById("overlay_layer").style.zIndex = 2001;
              }

              (0, _ui.Toast)('网络异常', 2000, {
                didClose: function didClose() {
                  document.getElementById("overlay_layer").style.zIndex = -1;
                }
              });
              return _context.abrupt("return");

            case 14:
              mergedHeaders = _objectSpread({}, mHeaders, {}, headers);

              if (withToken && token) {
                params.token = token;
              }

              params = _objectSpread({}, params, {}, mergeData);
              _context.next = 19;
              return regeneratorRuntime.awrap((0, _apiBase.callApi)(uri, params, method, mergedHeaders, false, secret, secretKey, contentType)["catch"](function (e) {
                //捕获网络异常
                if (document.getElementById("overlay_layer")) {
                  document.getElementById("overlay_layer").style.zIndex = 2001;
                }

                (0, _ui.Toast)(e.message || '网络异常', 2000, {
                  didClose: function didClose() {
                    document.getElementById("overlay_layer").style.zIndex = -1;
                  }
                });
              }));

            case 19:
              result = _context.sent;

              if (!result) {
                _context.next = 23;
                break;
              }

              //判断接口错误
              if (!result.success && !hideError) {
                if (document.getElementById("overlay_layer")) {
                  document.getElementById("overlay_layer").style.zIndex = 2001;
                }

                if (result.code == "200900") {} else {
                  (0, _ui.Toast)(result.message || '接口错误', 2000, {
                    didClose: function didClose() {
                      document.getElementById("overlay_layer").style.zIndex = -1;
                    }
                  });
                }
              } //返回整个结果


              return _context.abrupt("return", result);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[3, 9]]);
    };
  };

  for (var key in apiList) {
    _loop(key);
  }

  return api;
}