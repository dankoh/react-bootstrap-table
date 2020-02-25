"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = _interopRequireDefault(require("./utils"));

var _simpleRow = _interopRequireDefault(require("./row/simple-row"));

var _aggregateRow = _interopRequireDefault(require("./row/aggregate-row"));

var _rowSection = _interopRequireDefault(require("./row/row-section"));

var _const = _interopRequireDefault(require("./const"));

var _rowConsumer = _interopRequireDefault(require("./row-selection/row-consumer"));

var _rowConsumer2 = _interopRequireDefault(require("./row-expand/row-consumer"));

var _reactWindow = require("react-window");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var Body =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Body, _React$Component);

  function Body(props) {
    var _this;

    _classCallCheck(this, Body);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Body).call(this, props));
    var keyField = props.keyField,
        cellEdit = props.cellEdit,
        selectRow = props.selectRow,
        expandRow = props.expandRow; // Construct Editing Cell Component

    if (cellEdit.createContext) {
      _this.EditingCell = cellEdit.createEditingCell(_utils["default"], cellEdit.options.onStartEdit);
    } // Construct Row Component


    var RowComponent = _simpleRow["default"];
    var selectRowEnabled = selectRow.mode !== _const["default"].ROW_SELECT_DISABLED;
    var expandRowEnabled = !!expandRow.renderer;

    if (expandRowEnabled) {
      RowComponent = (0, _rowConsumer2["default"])(_aggregateRow["default"]);
    }

    if (selectRowEnabled) {
      RowComponent = (0, _rowConsumer["default"])(expandRowEnabled ? RowComponent : _aggregateRow["default"]);
    }

    if (cellEdit.createContext) {
      RowComponent = cellEdit.withRowLevelCellEdit(RowComponent, selectRowEnabled, keyField, _utils["default"]);
    }

    _this.RowComponent = RowComponent;
    return _this;
  }

  _createClass(Body, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          columns = _this$props.columns,
          data = _this$props.data,
          tabIndexCell = _this$props.tabIndexCell,
          keyField = _this$props.keyField,
          isEmpty = _this$props.isEmpty,
          noDataIndication = _this$props.noDataIndication,
          visibleColumnSize = _this$props.visibleColumnSize,
          cellEdit = _this$props.cellEdit,
          selectRow = _this$props.selectRow,
          rowStyle = _this$props.rowStyle,
          rowClasses = _this$props.rowClasses,
          rowEvents = _this$props.rowEvents,
          expandRow = _this$props.expandRow,
          className = _this$props.className,
          tableClass = _this$props.tableClass,
          listRef = _this$props.listRef;
      var content;

      if (isEmpty) {
        var indication = _utils["default"].isFunction(noDataIndication) ? noDataIndication() : noDataIndication;

        if (!indication) {
          return null;
        }

        content = _react["default"].createElement(_rowSection["default"], {
          content: indication,
          colSpan: visibleColumnSize
        });
      } else {
        var selectRowEnabled = selectRow.mode !== _const["default"].ROW_SELECT_DISABLED;
        var expandRowEnabled = !!expandRow.renderer;
        var additionalRowProps = {};

        if (cellEdit.createContext) {
          additionalRowProps.EditingCellComponent = this.EditingCell;
        }

        if (selectRowEnabled || expandRowEnabled) {
          additionalRowProps.expandRow = expandRow;
          additionalRowProps.selectRow = selectRow;
        }

        var Row = function Row(_ref) {
          var index = _ref.index,
              style = _ref.style;

          var key = _utils["default"].get(data[index], keyField);

          var row = data[index];

          var baseRowProps = _objectSpread({
            key: key,
            row: row,
            tabIndexCell: tabIndexCell,
            columns: columns,
            keyField: keyField,
            cellEdit: cellEdit,
            value: key,
            rowIndex: index,
            visibleColumnSize: visibleColumnSize,
            attrs: rowEvents || {}
          }, additionalRowProps);

          var UserStyle = _utils["default"].isFunction(rowStyle) ? rowStyle(row, index) : rowStyle;
          baseRowProps.style = _objectSpread({}, style, {}, UserStyle);
          baseRowProps.className = _utils["default"].isFunction(rowClasses) ? rowClasses(data[index], index) : rowClasses;
          return _react["default"].createElement(_this2.RowComponent, baseRowProps);
        };

        var TableBody = function TableBody(_ref2) {
          var children = _ref2.children,
              props = _objectWithoutProperties(_ref2, ["children"]);

          return _react["default"].createElement("table", _extends({}, props, {
            className: tableClass
          }), _react["default"].createElement("tbody", {
            className: className
          }, children));
        };

        return _react["default"].createElement(_reactWindow.FixedSizeList, {
          className: "List",
          height: 300,
          itemCount: data.length,
          itemSize: 50,
          ref: listRef,
          innerElementType: TableBody
        }, Row);
      }
    }
  }]);

  return Body;
}(_react["default"].Component);

Body.propTypes = {
  keyField: _propTypes["default"].string.isRequired,
  data: _propTypes["default"].array.isRequired,
  columns: _propTypes["default"].array.isRequired,
  selectRow: _propTypes["default"].object
};
var _default = Body;
exports["default"] = _default;