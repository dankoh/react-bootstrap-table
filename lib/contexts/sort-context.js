"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _const = _interopRequireDefault(require("../const"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(dataOperator, isRemoteSort, handleSortChange) {
  var SortContext = _react["default"].createContext();

  var SortProvider =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(SortProvider, _React$Component);

    function SortProvider(props) {
      var _this;

      _classCallCheck(this, SortProvider);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SortProvider).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "handleSort", function (column) {
        var sortOrder = dataOperator.nextOrder(column, _this.state, _this.props.defaultSortDirection);

        if (column.onSort) {
          column.onSort(column.dataField, sortOrder);
        }

        if (isRemoteSort()) {
          handleSortChange(column.dataField, sortOrder);
        }

        _this.setState(function () {
          return {
            sortOrder: sortOrder,
            sortColumn: column
          };
        });
      });

      var _sortOrder;

      var sortColumn;
      var defaultSorted = props.defaultSorted,
          defaultSortDirection = props.defaultSortDirection,
          sort = props.sort;

      if (defaultSorted && defaultSorted.length > 0) {
        _sortOrder = defaultSorted[0].order || defaultSortDirection;
        sortColumn = _this.initSort(defaultSorted[0].dataField, _sortOrder);
      } else if (sort && sort.dataField && sort.order) {
        _sortOrder = sort.order;
        sortColumn = _this.initSort(sort.dataField, _sortOrder);
      }

      _this.state = {
        sortOrder: _sortOrder,
        sortColumn: sortColumn
      };
      return _this;
    }

    _createClass(SortProvider, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$state = this.state,
            sortOrder = _this$state.sortOrder,
            sortColumn = _this$state.sortColumn;

        if (isRemoteSort() && sortOrder && sortColumn) {
          handleSortChange(sortColumn.dataField, sortOrder);
        }
      }
    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var sort = nextProps.sort,
            columns = nextProps.columns;

        if (sort && sort.dataField && sort.order) {
          this.setState({
            sortOrder: sort.order,
            sortColumn: columns.find(function (col) {
              return col.dataField === sort.dataField;
            })
          });
        }
      }
    }, {
      key: "initSort",
      value: function initSort(sortField, sortOrder) {
        var sortColumn;
        var columns = this.props.columns;
        var sortColumns = columns.filter(function (col) {
          return col.dataField === sortField;
        });

        if (sortColumns.length > 0) {
          sortColumn = sortColumns[0];

          if (sortColumn.onSort) {
            sortColumn.onSort(sortField, sortOrder);
          }
        }

        return sortColumn;
      }
    }, {
      key: "render",
      value: function render() {
        var data = this.props.data;
        var sort = this.props.sort;
        var _this$state2 = this.state,
            sortOrder = _this$state2.sortOrder,
            sortColumn = _this$state2.sortColumn;

        if (!isRemoteSort() && sortColumn) {
          var sortFunc = sortColumn.sortFunc ? sortColumn.sortFunc : sort && sort.sortFunc;
          data = dataOperator.sort(data, sortOrder, _objectSpread({}, sortColumn, {
            sortFunc: sortFunc
          }));
        }

        return _react["default"].createElement(SortContext.Provider, {
          value: {
            data: data,
            sortOrder: sortOrder,
            onSort: this.handleSort,
            sortField: sortColumn ? sortColumn.dataField : null
          }
        }, this.props.children);
      }
    }]);

    return SortProvider;
  }(_react["default"].Component);

  _defineProperty(SortProvider, "propTypes", {
    data: _propTypes["default"].array.isRequired,
    columns: _propTypes["default"].array.isRequired,
    children: _propTypes["default"].node.isRequired,
    defaultSorted: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      dataField: _propTypes["default"].string.isRequired,
      order: _propTypes["default"].oneOf([_const["default"].SORT_DESC, _const["default"].SORT_ASC]).isRequired
    })),
    sort: _propTypes["default"].shape({
      dataField: _propTypes["default"].string,
      order: _propTypes["default"].oneOf([_const["default"].SORT_DESC, _const["default"].SORT_ASC]),
      sortFunc: _propTypes["default"].func
    }),
    defaultSortDirection: _propTypes["default"].oneOf([_const["default"].SORT_DESC, _const["default"].SORT_ASC])
  });

  return {
    Provider: SortProvider,
    Consumer: SortContext.Consumer
  };
};

exports["default"] = _default;