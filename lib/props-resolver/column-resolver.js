"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
    function (_ExtendBase) {
      _inherits(ColumnResolver, _ExtendBase);

      function ColumnResolver() {
        _classCallCheck(this, ColumnResolver);

        return _possibleConstructorReturn(this, _getPrototypeOf(ColumnResolver).apply(this, arguments));
      }

      _createClass(ColumnResolver, [{
        key: "visibleColumnSize",
        value: function visibleColumnSize() {
          var includeSelectColumn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          var columnLen;

          if (this.props.columnToggle && this.props.columnToggle.toggles) {
            var columns = this.props.columnToggle.toggles;
            columnLen = Object.keys(columns).filter(function (name) {
              return columns[name];
            }).length;
          } else {
            columnLen = this.props.columns.filter(function (c) {
              return !c.hidden;
            }).length;
          }

          if (!includeSelectColumn) return columnLen;

          if (this.props.selectRow && !this.props.selectRow.hideSelectColumn) {
            columnLen += 1;
          }

          if (this.props.expandRow && this.props.expandRow.showExpandColumn) {
            columnLen += 1;
          }

          return columnLen;
        }
      }]);

      return ColumnResolver;
    }(ExtendBase)
  );
};

exports["default"] = _default;