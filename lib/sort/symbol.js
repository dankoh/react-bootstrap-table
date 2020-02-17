"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _bootstrap = require("../contexts/bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SortSymbol = function SortSymbol() {
  return _react["default"].createElement(_bootstrap.BootstrapContext.Consumer, null, function (_ref) {
    var bootstrap4 = _ref.bootstrap4;
    return bootstrap4 ? _react["default"].createElement("span", {
      className: "order-4"
    }) : _react["default"].createElement("span", {
      className: "order"
    }, _react["default"].createElement("span", {
      className: "dropdown"
    }, _react["default"].createElement("span", {
      className: "caret"
    })), _react["default"].createElement("span", {
      className: "dropup"
    }, _react["default"].createElement("span", {
      className: "caret"
    })));
  });
};

var _default = SortSymbol;
exports["default"] = _default;