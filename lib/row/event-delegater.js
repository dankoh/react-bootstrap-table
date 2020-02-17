"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("../utils"));

var _const = _interopRequireDefault(require("../const"));

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
      _inherits(RowEventDelegater, _ExtendBase);

      function RowEventDelegater(props) {
        var _this;

        _classCallCheck(this, RowEventDelegater);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(RowEventDelegater).call(this, props));
        _this.clickNum = 0;
        _this.createDefaultEventHandler = _this.createDefaultEventHandler.bind(_assertThisInitialized(_this));
        _this.createClickEventHandler = _this.createClickEventHandler.bind(_assertThisInitialized(_this));
        return _this;
      }

      _createClass(RowEventDelegater, [{
        key: "createClickEventHandler",
        value: function createClickEventHandler(cb) {
          var _this2 = this;

          return function (e) {
            var _this2$props = _this2.props,
                row = _this2$props.row,
                selected = _this2$props.selected,
                keyField = _this2$props.keyField,
                selectable = _this2$props.selectable,
                expandable = _this2$props.expandable,
                rowIndex = _this2$props.rowIndex,
                expanded = _this2$props.expanded,
                expandRow = _this2$props.expandRow,
                selectRow = _this2$props.selectRow,
                DELAY_FOR_DBCLICK = _this2$props.DELAY_FOR_DBCLICK;

            var clickFn = function clickFn() {
              if (cb) {
                cb(e, row, rowIndex);
              }

              var key = _utils["default"].get(row, keyField);

              if (expandRow && expandable && !expandRow.expandByColumnOnly) {
                if (selectRow.mode !== _const["default"].ROW_SELECT_DISABLED && selectRow.clickToExpand || selectRow.mode === _const["default"].ROW_SELECT_DISABLED) {
                  expandRow.onRowExpand(key, !expanded, rowIndex, e);
                }
              }

              if (selectRow.clickToSelect && selectable) {
                selectRow.onRowSelect(key, !selected, rowIndex, e);
              }
            };

            if (DELAY_FOR_DBCLICK) {
              _this2.clickNum += 1;

              _utils["default"].debounce(function () {
                if (_this2.clickNum === 1) {
                  clickFn();
                }

                _this2.clickNum = 0;
              }, DELAY_FOR_DBCLICK)();
            } else {
              clickFn();
            }
          };
        }
      }, {
        key: "createDefaultEventHandler",
        value: function createDefaultEventHandler(cb) {
          var _this3 = this;

          return function (e) {
            var _this3$props = _this3.props,
                row = _this3$props.row,
                rowIndex = _this3$props.rowIndex;
            cb(e, row, rowIndex);
          };
        }
      }, {
        key: "delegate",
        value: function delegate() {
          var _this4 = this;

          var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          var newAttrs = _objectSpread({}, attrs);

          Object.keys(attrs).forEach(function (attr) {
            if (_utils["default"].contains(events, attr)) {
              newAttrs[attr] = _this4.createDefaultEventHandler(attrs[attr]);
            }
          });
          return newAttrs;
        }
      }]);

      return RowEventDelegater;
    }(ExtendBase)
  );
};

exports["default"] = _default;