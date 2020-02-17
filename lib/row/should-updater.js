"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("../utils"));

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
    function (_ExtendBase) {
      _inherits(RowShouldUpdater, _ExtendBase);

      function RowShouldUpdater() {
        _classCallCheck(this, RowShouldUpdater);

        return _possibleConstructorReturn(this, _getPrototypeOf(RowShouldUpdater).apply(this, arguments));
      }

      _createClass(RowShouldUpdater, [{
        key: "shouldUpdateByCellEditing",
        value: function shouldUpdateByCellEditing(nextProps) {
          if (!(this.props.clickToEdit || this.props.dbclickToEdit)) return false;
          return nextProps.editingRowIdx === nextProps.rowIndex || this.props.editingRowIdx === nextProps.rowIndex && nextProps.editingRowIdx === null || this.props.editingRowIdx === nextProps.rowIndex;
        }
      }, {
        key: "shouldUpdatedBySelfProps",
        value: function shouldUpdatedBySelfProps(nextProps) {
          return this.props.className !== nextProps.className || !_utils["default"].isEqual(this.props.style, nextProps.style) || !_utils["default"].isEqual(this.props.attrs, nextProps.attrs);
        } // Only use for simple-row

      }, {
        key: "shouldUpdateByColumnsForSimpleCheck",
        value: function shouldUpdateByColumnsForSimpleCheck(nextProps) {
          if (this.props.columns.length !== nextProps.columns.length) {
            return true;
          }

          for (var i = 0; i < this.props.columns.length; i += 1) {
            if (!_utils["default"].isEqual(this.props.columns[i], nextProps.columns[i])) {
              return true;
            }
          }

          return false;
        }
      }, {
        key: "shouldUpdatedByNormalProps",
        value: function shouldUpdatedByNormalProps(nextProps) {
          var shouldUpdate = this.props.rowIndex !== nextProps.rowIndex || this.props.editable !== nextProps.editable || !_utils["default"].isEqual(this.props.row, nextProps.row) || this.props.columns.length !== nextProps.columns.length;
          return shouldUpdate;
        }
      }, {
        key: "shouldUpdateChild",
        value: function shouldUpdateChild(nextProps) {
          return this.shouldUpdateByCellEditing(nextProps) || this.shouldUpdatedByNormalProps(nextProps);
        }
      }, {
        key: "shouldRowContentUpdate",
        value: function shouldRowContentUpdate(nextProps) {
          return this.shouldUpdateChild(nextProps) || this.shouldUpdateByColumnsForSimpleCheck(nextProps);
        }
      }]);

      return RowShouldUpdater;
    }(ExtendBase)
  );
};

exports["default"] = _default;