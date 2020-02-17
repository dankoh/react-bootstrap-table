"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = _interopRequireDefault(require("../utils"));

var _cell = _interopRequireDefault(require("../cell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var RowPureContent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RowPureContent, _React$Component);

  function RowPureContent() {
    _classCallCheck(this, RowPureContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(RowPureContent).apply(this, arguments));
  }

  _createClass(RowPureContent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (typeof nextProps.shouldUpdate !== 'undefined') {
        return nextProps.shouldUpdate;
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          row = _this$props.row,
          keyField = _this$props.keyField,
          columns = _this$props.columns,
          rowIndex = _this$props.rowIndex,
          editable = _this$props.editable,
          editingRowIdx = _this$props.editingRowIdx,
          editingColIdx = _this$props.editingColIdx,
          onStart = _this$props.onStart,
          clickToEdit = _this$props.clickToEdit,
          dbclickToEdit = _this$props.dbclickToEdit,
          EditingCellComponent = _this$props.EditingCellComponent,
          tabIndexStart = _this$props.tabIndexStart;
      var tabIndex = tabIndexStart;
      return columns.map(function (column, index) {
        var dataField = column.dataField;

        var content = _utils["default"].get(row, dataField);

        if (rowIndex === editingRowIdx && index === editingColIdx) {
          return _react["default"].createElement(EditingCellComponent, {
            key: "".concat(content, "-").concat(index, "-editing"),
            row: row,
            rowIndex: rowIndex,
            column: column,
            columnIndex: index
          });
        } // render cell


        var cellTitle;
        var cellStyle = {};

        var cellAttrs = _objectSpread({}, _utils["default"].isFunction(column.attrs) ? column.attrs(content, row, rowIndex, index) : column.attrs);

        if (column.events) {
          var events = Object.assign({}, column.events);
          Object.keys(Object.assign({}, column.events)).forEach(function (key) {
            var originFn = events[key];

            events[key] = function () {
              for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
              }

              return originFn.apply(void 0, rest.concat([row, rowIndex]));
            };
          });
          cellAttrs = _objectSpread({}, cellAttrs, {}, events);
        }

        var cellClasses = _utils["default"].isFunction(column.classes) ? column.classes(content, row, rowIndex, index) : column.classes;

        if (column.style) {
          cellStyle = _utils["default"].isFunction(column.style) ? column.style(content, row, rowIndex, index) : column.style;
          cellStyle = Object.assign({}, cellStyle) || {};
        }

        if (column.title) {
          cellTitle = _utils["default"].isFunction(column.title) ? column.title(content, row, rowIndex, index) : content;
          cellAttrs.title = cellTitle;
        }

        if (column.align) {
          cellStyle.textAlign = _utils["default"].isFunction(column.align) ? column.align(content, row, rowIndex, index) : column.align;
        }

        if (cellClasses) cellAttrs.className = cellClasses;
        if (!_utils["default"].isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;
        var editableCell = _utils["default"].isDefined(column.editable) ? column.editable : true;
        if (column.dataField === keyField || !editable) editableCell = false;

        if (_utils["default"].isFunction(column.editable)) {
          editableCell = column.editable(content, row, rowIndex, index);
        }

        if (tabIndexStart !== -1) {
          cellAttrs.tabIndex = tabIndex++;
        }

        return _react["default"].createElement(_cell["default"], _extends({
          key: "".concat(content, "-").concat(index),
          row: row,
          editable: editableCell,
          rowIndex: rowIndex,
          columnIndex: index,
          column: column,
          onStart: onStart,
          clickToEdit: clickToEdit,
          dbclickToEdit: dbclickToEdit
        }, cellAttrs));
      });
    }
  }]);

  return RowPureContent;
}(_react["default"].Component);

exports["default"] = RowPureContent;