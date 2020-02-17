"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = _interopRequireDefault(require("./utils"));

var _cellEventDelegater = _interopRequireDefault(require("./cell-event-delegater"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FooterCell =
/*#__PURE__*/
function (_eventDelegater) {
  _inherits(FooterCell, _eventDelegater);

  function FooterCell() {
    _classCallCheck(this, FooterCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(FooterCell).apply(this, arguments));
  }

  _createClass(FooterCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          index = _this$props.index,
          column = _this$props.column,
          columnData = _this$props.columnData;
      var footer = column.footer,
          footerTitle = column.footerTitle,
          footerAlign = column.footerAlign,
          footerFormatter = column.footerFormatter,
          footerEvents = column.footerEvents,
          footerClasses = column.footerClasses,
          footerStyle = column.footerStyle,
          footerAttrs = column.footerAttrs;
      var delegateEvents = this.delegate(footerEvents);

      var cellAttrs = _objectSpread({}, _utils["default"].isFunction(footerAttrs) ? footerAttrs(column, index) : footerAttrs, {}, delegateEvents);

      var text = '';

      if (_utils["default"].isString(footer)) {
        text = footer;
      } else if (_utils["default"].isFunction(footer)) {
        text = footer(columnData, column, index);
      }

      var cellStyle = {};
      var cellClasses = _utils["default"].isFunction(footerClasses) ? footerClasses(column, index) : footerClasses;

      if (footerStyle) {
        cellStyle = _utils["default"].isFunction(footerStyle) ? footerStyle(column, index) : footerStyle;
        cellStyle = cellStyle ? _objectSpread({}, cellStyle) : cellStyle;
      }

      if (footerTitle) {
        cellAttrs.title = _utils["default"].isFunction(footerTitle) ? footerTitle(column, index) : text;
      }

      if (footerAlign) {
        cellStyle.textAlign = _utils["default"].isFunction(footerAlign) ? footerAlign(column, index) : footerAlign;
      }

      if (cellClasses) cellAttrs.className = (0, _classnames["default"])(cellAttrs.className, cellClasses);
      if (!_utils["default"].isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;
      var children = footerFormatter ? footerFormatter(column, index) : text;
      return _react["default"].createElement('th', cellAttrs, children);
    }
  }]);

  return FooterCell;
}((0, _cellEventDelegater["default"])(_react["default"].Component));

FooterCell.propTypes = {
  columnData: _propTypes["default"].array,
  index: _propTypes["default"].number,
  column: _propTypes["default"].object
};
var _default = FooterCell;
exports["default"] = _default;