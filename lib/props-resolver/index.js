"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("../utils"));

var _columnResolver = _interopRequireDefault(require("./column-resolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _default = function _default(ExtendBase) {
  return (
    /*#__PURE__*/
    function (_ColumnResolver) {
      _inherits(TableResolver, _ColumnResolver);

      function TableResolver() {
        _classCallCheck(this, TableResolver);

        return _possibleConstructorReturn(this, _getPrototypeOf(TableResolver).apply(this, arguments));
      }

      _createClass(TableResolver, [{
        key: "validateProps",
        value: function validateProps() {
          var keyField = this.props.keyField;

          if (!keyField) {
            throw new Error('Please specify a field as key via keyField');
          }

          if (this.visibleColumnSize(false) <= 0) {
            throw new Error('No visible columns detected');
          }
        }
      }, {
        key: "isEmpty",
        value: function isEmpty() {
          return this.props.data.length === 0;
        }
      }, {
        key: "visibleRows",
        value: function visibleRows() {
          var _this$props = this.props,
              data = _this$props.data,
              hiddenRows = _this$props.hiddenRows,
              keyField = _this$props.keyField;
          if (!hiddenRows || hiddenRows.length === 0) return data;
          return data.filter(function (row) {
            var key = _utils["default"].get(row, keyField);

            return !_utils["default"].contains(hiddenRows, key);
          });
        }
      }]);

      return TableResolver;
    }((0, _columnResolver["default"])(ExtendBase))
  );
};

exports["default"] = _default;