"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var events = ['onClick', 'onDoubleClick', 'onMouseEnter', 'onMouseLeave', 'onContextMenu'];

var _default = function _default(ExtendBase) {
  return (
    /*#__PURE__*/
    function (_ExtendBase) {
      _inherits(CellEventDelegater, _ExtendBase);

      function CellEventDelegater(props) {
        var _this;

        _classCallCheck(this, CellEventDelegater);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(CellEventDelegater).call(this, props));
        _this.createDefaultEventHandler = _this.createDefaultEventHandler.bind(_assertThisInitialized(_this));
        return _this;
      }

      _createClass(CellEventDelegater, [{
        key: "createDefaultEventHandler",
        value: function createDefaultEventHandler(cb) {
          var _this2 = this;

          return function (e) {
            var _this2$props = _this2.props,
                column = _this2$props.column,
                columnIndex = _this2$props.columnIndex,
                index = _this2$props.index;
            cb(e, column, typeof columnIndex !== 'undefined' ? columnIndex : index);
          };
        }
      }, {
        key: "delegate",
        value: function delegate() {
          var _this3 = this;

          var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          var newAttrs = _objectSpread({}, attrs);

          Object.keys(attrs).forEach(function (attr) {
            if (_utils["default"].contains(events, attr)) {
              newAttrs[attr] = _this3.createDefaultEventHandler(attrs[attr]);
            }
          });
          return newAttrs;
        }
      }]);

      return CellEventDelegater;
    }(ExtendBase)
  );
};

exports["default"] = _default;