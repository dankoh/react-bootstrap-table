"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _const = _interopRequireDefault(require("./const"));

var _symbol = _interopRequireDefault(require("./sort/symbol"));

var _caret = _interopRequireDefault(require("./sort/caret"));

var _utils = _interopRequireDefault(require("./utils"));

var _cellEventDelegater = _interopRequireDefault(require("./cell-event-delegater"));

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

var HeaderCell =
/*#__PURE__*/
function (_eventDelegater) {
  _inherits(HeaderCell, _eventDelegater);

  function HeaderCell() {
    _classCallCheck(this, HeaderCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeaderCell).apply(this, arguments));
  }

  _createClass(HeaderCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          column = _this$props.column,
          index = _this$props.index,
          onSort = _this$props.onSort,
          sorting = _this$props.sorting,
          sortOrder = _this$props.sortOrder,
          isLastSorting = _this$props.isLastSorting,
          onFilter = _this$props.onFilter,
          currFilters = _this$props.currFilters,
          filterPosition = _this$props.filterPosition,
          onExternalFilter = _this$props.onExternalFilter,
          globalSortCaret = _this$props.globalSortCaret;
      var text = column.text,
          sort = column.sort,
          sortCaret = column.sortCaret,
          filter = column.filter,
          filterRenderer = column.filterRenderer,
          headerTitle = column.headerTitle,
          headerAlign = column.headerAlign,
          headerFormatter = column.headerFormatter,
          headerEvents = column.headerEvents,
          headerClasses = column.headerClasses,
          headerStyle = column.headerStyle,
          headerAttrs = column.headerAttrs,
          headerSortingClasses = column.headerSortingClasses,
          headerSortingStyle = column.headerSortingStyle;
      var sortCaretfunc = sortCaret || globalSortCaret;
      var delegateEvents = this.delegate(headerEvents);
      var customAttrs = _utils["default"].isFunction(headerAttrs) ? headerAttrs(column, index) : headerAttrs || {};

      var cellAttrs = _objectSpread({}, customAttrs, {}, delegateEvents, {
        tabIndex: _utils["default"].isDefined(customAttrs.tabIndex) ? customAttrs.tabIndex : 0
      });

      var sortSymbol;
      var filterElm;
      var cellStyle = {};
      var cellClasses = _utils["default"].isFunction(headerClasses) ? headerClasses(column, index) : headerClasses;

      if (headerStyle) {
        cellStyle = _utils["default"].isFunction(headerStyle) ? headerStyle(column, index) : headerStyle;
        cellStyle = cellStyle ? _objectSpread({}, cellStyle) : cellStyle;
      }

      if (headerTitle) {
        cellAttrs.title = _utils["default"].isFunction(headerTitle) ? headerTitle(column, index) : text;
      }

      if (headerAlign) {
        cellStyle.textAlign = _utils["default"].isFunction(headerAlign) ? headerAlign(column, index) : headerAlign;
      }

      if (sort) {
        var customClick = cellAttrs.onClick;

        cellAttrs.onKeyUp = function (e) {
          if (e.key === 'Enter') {
            onSort(column);
            if (_utils["default"].isFunction(customClick)) customClick(e);
          }
        };

        cellAttrs.onClick = function (e) {
          onSort(column);
          if (_utils["default"].isFunction(customClick)) customClick(e);
        };

        cellAttrs.className = (0, _classnames["default"])(cellAttrs.className, 'sortable');

        if (sorting) {
          sortSymbol = sortCaretfunc ? sortCaretfunc(sortOrder, column) : _react["default"].createElement(_caret["default"], {
            order: sortOrder
          }); // append customized classes or style if table was sorting based on the current column.

          cellClasses = (0, _classnames["default"])(cellClasses, _utils["default"].isFunction(headerSortingClasses) ? headerSortingClasses(column, sortOrder, isLastSorting, index) : headerSortingClasses);
          cellStyle = _objectSpread({}, cellStyle, {}, _utils["default"].isFunction(headerSortingStyle) ? headerSortingStyle(column, sortOrder, isLastSorting, index) : headerSortingStyle);
        } else {
          sortSymbol = sortCaretfunc ? sortCaretfunc(undefined, column) : _react["default"].createElement(_symbol["default"], null);
        }
      }

      if (cellClasses) cellAttrs.className = (0, _classnames["default"])(cellAttrs.className, cellClasses);
      if (!_utils["default"].isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;

      if (filterPosition === _const["default"].FILTERS_POSITION_INLINE) {
        if (filterRenderer) {
          var onCustomFilter = onExternalFilter(column, filter.props.type);
          filterElm = filterRenderer(onCustomFilter, column);
        } else if (filter) {
          filterElm = _react["default"].createElement(filter.Filter, _extends({}, filter.props, {
            filterState: currFilters[column.dataField],
            onFilter: onFilter,
            column: column
          }));
        }
      }

      var children = headerFormatter ? headerFormatter(column, index, {
        sortElement: sortSymbol,
        filterElement: filterElm
      }) : text;

      if (headerFormatter) {
        return _react["default"].createElement('th', cellAttrs, children);
      }

      return _react["default"].createElement('th', cellAttrs, children, sortSymbol, filterElm);
    }
  }]);

  return HeaderCell;
}((0, _cellEventDelegater["default"])(_react["default"].Component));

HeaderCell.propTypes = {
  column: _propTypes["default"].shape({
    dataField: _propTypes["default"].string.isRequired,
    text: _propTypes["default"].string.isRequired,
    type: _propTypes["default"].oneOf([_const["default"].TYPE_STRING, _const["default"].TYPE_NUMBER, _const["default"].TYPE_BOOLEAN, _const["default"].TYPE_DATE]),
    isDummyField: _propTypes["default"].bool,
    hidden: _propTypes["default"].bool,
    headerFormatter: _propTypes["default"].func,
    formatter: _propTypes["default"].func,
    formatExtraData: _propTypes["default"].any,
    headerClasses: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    classes: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    headerStyle: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
    style: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
    headerTitle: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func]),
    title: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func]),
    headerEvents: _propTypes["default"].object,
    events: _propTypes["default"].object,
    headerAlign: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    align: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    headerAttrs: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
    attrs: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
    sort: _propTypes["default"].bool,
    sortFunc: _propTypes["default"].func,
    onSort: _propTypes["default"].func,
    editor: _propTypes["default"].object,
    editable: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func]),
    editCellStyle: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
    editCellClasses: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    editorStyle: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
    editorClasses: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    editorRenderer: _propTypes["default"].func,
    validator: _propTypes["default"].func,
    filter: _propTypes["default"].object,
    filterRenderer: _propTypes["default"].func,
    filterValue: _propTypes["default"].func,
    searchable: _propTypes["default"].bool
  }).isRequired,
  index: _propTypes["default"].number.isRequired,
  onSort: _propTypes["default"].func,
  sorting: _propTypes["default"].bool,
  sortOrder: _propTypes["default"].oneOf([_const["default"].SORT_ASC, _const["default"].SORT_DESC]),
  sortCaret: _propTypes["default"].func,
  isLastSorting: _propTypes["default"].bool,
  onFilter: _propTypes["default"].func,
  filterPosition: _propTypes["default"].oneOf([_const["default"].FILTERS_POSITION_INLINE, _const["default"].FILTERS_POSITION_BOTTOM, _const["default"].FILTERS_POSITION_TOP]),
  currFilters: _propTypes["default"].object,
  onExternalFilter: _propTypes["default"].func
};
var _default = HeaderCell;
exports["default"] = _default;