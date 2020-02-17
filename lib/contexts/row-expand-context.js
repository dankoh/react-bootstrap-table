"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _operators = _interopRequireDefault(require("../store/operators"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RowExpandContext = _react["default"].createContext();

var RowExpandProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RowExpandProvider, _React$Component);

  function RowExpandProvider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RowExpandProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RowExpandProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      expanded: _this.props.expandRow.expanded || [],
      isClosing: _this.props.expandRow.isClosing || []
    });

    _defineProperty(_assertThisInitialized(_this), "onClosed", function (closedRow) {
      _this.setState({
        isClosing: _this.state.isClosing.filter(function (value) {
          return value !== closedRow;
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRowExpand", function (rowKey, expanded, rowIndex, e) {
      var _this$props = _this.props,
          data = _this$props.data,
          keyField = _this$props.keyField,
          _this$props$expandRow = _this$props.expandRow,
          onExpand = _this$props$expandRow.onExpand,
          onlyOneExpanding = _this$props$expandRow.onlyOneExpanding,
          nonExpandable = _this$props$expandRow.nonExpandable;

      if (nonExpandable && _utils["default"].contains(nonExpandable, rowKey)) {
        return;
      }

      var currExpanded = _toConsumableArray(_this.state.expanded);

      var isClosing = _toConsumableArray(_this.state.isClosing);

      if (expanded) {
        if (onlyOneExpanding) {
          isClosing = isClosing.concat(currExpanded);
          currExpanded = [rowKey];
        } else currExpanded.push(rowKey);
      } else {
        isClosing.push(rowKey);
        currExpanded = currExpanded.filter(function (value) {
          return value !== rowKey;
        });
      }

      if (onExpand) {
        var row = _operators["default"].getRowByRowId(data, keyField, rowKey);

        onExpand(row, expanded, rowIndex, e);
      }

      _this.setState(function () {
        return {
          expanded: currExpanded,
          isClosing: isClosing
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleAllRowExpand", function (e, expandAll) {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          keyField = _this$props2.keyField,
          _this$props2$expandRo = _this$props2.expandRow,
          onExpandAll = _this$props2$expandRo.onExpandAll,
          nonExpandable = _this$props2$expandRo.nonExpandable;
      var expanded = _this.state.expanded;
      var currExpanded;

      if (expandAll) {
        currExpanded = expanded.concat(_operators["default"].expandableKeys(data, keyField, nonExpandable));
      } else {
        currExpanded = expanded.filter(function (s) {
          return typeof data.find(function (d) {
            return _utils["default"].get(d, keyField) === s;
          }) === 'undefined';
        });
      }

      if (onExpandAll) {
        onExpandAll(expandAll, _operators["default"].getExpandedRows(data, keyField, currExpanded), e);
      }

      _this.setState(function () {
        return {
          expanded: currExpanded
        };
      });
    });

    return _this;
  }

  _createClass(RowExpandProvider, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.expandRow) {
        var nextExpanded = nextProps.expandRow.expanded || this.state.expanded;
        var isClosing = this.state.expanded.reduce(function (acc, cur) {
          if (!_utils["default"].contains(nextExpanded, cur)) {
            acc.push(cur);
          }

          return acc;
        }, []);
        this.setState(function () {
          return {
            expanded: nextExpanded,
            isClosing: isClosing
          };
        });
      } else {
        this.setState(function () {
          return {
            expanded: _this2.state.expanded
          };
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          data = _this$props3.data,
          keyField = _this$props3.keyField;
      return _react["default"].createElement(RowExpandContext.Provider, {
        value: _objectSpread({}, this.props.expandRow, {
          nonExpandable: this.props.expandRow.nonExpandable,
          expanded: this.state.expanded,
          isClosing: this.state.isClosing,
          onClosed: this.onClosed,
          isAnyExpands: _operators["default"].isAnyExpands(data, keyField, this.state.expanded),
          onRowExpand: this.handleRowExpand,
          onAllRowExpand: this.handleAllRowExpand
        })
      }, this.props.children);
    }
  }]);

  return RowExpandProvider;
}(_react["default"].Component);

_defineProperty(RowExpandProvider, "propTypes", {
  children: _propTypes["default"].node.isRequired,
  data: _propTypes["default"].array.isRequired,
  keyField: _propTypes["default"].string.isRequired
});

var _default = {
  Provider: RowExpandProvider,
  Consumer: RowExpandContext.Consumer
};
exports["default"] = _default;