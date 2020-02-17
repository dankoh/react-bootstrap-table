"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _events = _interopRequireDefault(require("events"));

var _utils = _interopRequireDefault(require("../utils"));

var _dataContext = _interopRequireDefault(require("./data-context"));

var _columnContext = _interopRequireDefault(require("./column-context"));

var _sortContext = _interopRequireDefault(require("./sort-context"));

var _selectionContext = _interopRequireDefault(require("./selection-context"));

var _rowExpandContext = _interopRequireDefault(require("./row-expand-context"));

var _remoteResolver2 = _interopRequireDefault(require("../props-resolver/remote-resolver"));

var _bootstrap = require("./bootstrap");

var _operators = _interopRequireDefault(require("../store/operators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var withContext = function withContext(Base) {
  return (
    /*#__PURE__*/
    function (_remoteResolver) {
      _inherits(BootstrapTableContainer, _remoteResolver);

      function BootstrapTableContainer(props) {
        var _this;

        _classCallCheck(this, BootstrapTableContainer);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(BootstrapTableContainer).call(this, props));
        _this.DataContext = (0, _dataContext["default"])();

        if (props.registerExposedAPI) {
          var exposedAPIEmitter = new _events["default"]();
          exposedAPIEmitter.on('get.table.data', function (payload) {
            return payload.result = _this.table.getData();
          });
          exposedAPIEmitter.on('get.selected.rows', function (payload) {
            return payload.result = _this.selectionContext.getSelected();
          });
          exposedAPIEmitter.on('get.filtered.rows', function (payload) {
            if (_this.searchContext) {
              payload.result = _this.searchContext.getSearched();
            } else if (_this.filterContext) {
              payload.result = _this.filterContext.getFiltered();
            } else {
              payload.result = _this.table.getData();
            }
          });
          props.registerExposedAPI(exposedAPIEmitter);
        }

        if (props.columns.filter(function (col) {
          return col.sort;
        }).length > 0) {
          _this.SortContext = (0, _sortContext["default"])(_operators["default"], _this.isRemoteSort, _this.handleRemoteSortChange);
        }

        if (props.columnToggle || props.columns.filter(function (col) {
          return col.hidden;
        }).length > 0) {
          _this.ColumnManagementContext = (0, _columnContext["default"])();
        }

        if (props.selectRow) {
          _this.SelectionContext = _selectionContext["default"];
        }

        if (props.expandRow) {
          _this.RowExpandContext = _rowExpandContext["default"];
        }

        if (props.cellEdit && props.cellEdit.createContext) {
          _this.CellEditContext = props.cellEdit.createContext(_utils["default"], _operators["default"], _this.isRemoteCellEdit, _this.handleRemoteCellChange);
        }

        if (props.filter) {
          _this.FilterContext = props.filter.createContext(_utils["default"], _this.isRemoteFiltering, _this.handleRemoteFilterChange);
        }

        if (props.pagination) {
          _this.PaginationContext = props.pagination.createContext();
        }

        if (props.search && props.search.searchContext) {
          _this.SearchContext = props.search.searchContext(_utils["default"], _this.isRemoteSearch, _this.handleRemoteSearchChange);
        }

        if (props.setDependencyModules) {
          props.setDependencyModules(_utils["default"]);
        }

        if (props.setPaginationRemoteEmitter) {
          props.setPaginationRemoteEmitter(_this.remoteEmitter);
        }

        return _this;
      }

      _createClass(BootstrapTableContainer, [{
        key: "UNSAFE_componentWillReceiveProps",
        value: function UNSAFE_componentWillReceiveProps(nextProps) {
          if (nextProps.columns.filter(function (col) {
            return col.sort;
          }).length > 0 && !this.SortContext) {
            this.SortContext = (0, _sortContext["default"])(_operators["default"], this.isRemoteSort, this.handleRemoteSortChange);
          } else {
            this.SortContext = null;
          }

          if (!nextProps.pagination && this.props.pagination) {
            this.PaginationContext = null;
          }

          if (nextProps.pagination && !this.props.pagination) {
            this.PaginationContext = nextProps.pagination.createContext(this.isRemotePagination, this.handleRemotePageChange);
          }

          if (!nextProps.cellEdit && this.props.cellEdit) {
            this.CellEditContext = null;
          }

          if (nextProps.cellEdit && !this.props.cellEdit) {
            this.CellEditContext = nextProps.cellEdit.createContext(_utils["default"], _operators["default"], this.isRemoteCellEdit, this.handleRemoteCellChange);
          }
        }
      }, {
        key: "renderBase",
        value: function renderBase() {
          var _this2 = this;

          return function (rootProps, filterProps, searchProps, sortProps, paginationProps, columnToggleProps) {
            return _react["default"].createElement(Base, _extends({
              ref: function ref(n) {
                return _this2.table = n;
              }
            }, _this2.props, sortProps, filterProps, searchProps, paginationProps, columnToggleProps, {
              data: rootProps.getData(filterProps, searchProps, sortProps, paginationProps)
            }));
          };
        }
      }, {
        key: "renderWithColumnManagementCtx",
        value: function renderWithColumnManagementCtx(base, baseProps) {
          var _this3 = this;

          return function (rootProps, filterProps, searchProps, sortProps, paginationProps) {
            return _react["default"].createElement(_this3.ColumnManagementContext.Provider, _extends({}, baseProps, {
              toggles: _this3.props.columnToggle ? _this3.props.columnToggle.toggles : null
            }), _react["default"].createElement(_this3.ColumnManagementContext.Consumer, null, function (columnToggleProps) {
              return base(rootProps, filterProps, searchProps, sortProps, paginationProps, columnToggleProps);
            }));
          };
        }
      }, {
        key: "renderWithSelectionCtx",
        value: function renderWithSelectionCtx(base, baseProps) {
          var _this4 = this;

          return function (rootProps, filterProps, searchProps, sortProps, paginationProps) {
            return _react["default"].createElement(_this4.SelectionContext.Provider, _extends({}, baseProps, {
              ref: function ref(n) {
                return _this4.selectionContext = n;
              },
              selectRow: _this4.props.selectRow,
              data: rootProps.getData(filterProps, searchProps, sortProps, paginationProps)
            }), base(rootProps, filterProps, searchProps, sortProps, paginationProps));
          };
        }
      }, {
        key: "renderWithRowExpandCtx",
        value: function renderWithRowExpandCtx(base, baseProps) {
          var _this5 = this;

          return function (rootProps, filterProps, searchProps, sortProps, paginationProps) {
            return _react["default"].createElement(_this5.RowExpandContext.Provider, _extends({}, baseProps, {
              ref: function ref(n) {
                return _this5.rowExpandContext = n;
              },
              expandRow: _this5.props.expandRow,
              data: rootProps.getData(filterProps, searchProps, sortProps, paginationProps)
            }), base(rootProps, filterProps, searchProps, sortProps, paginationProps));
          };
        }
      }, {
        key: "renderWithPaginationCtx",
        value: function renderWithPaginationCtx(base) {
          var _this6 = this;

          return function (rootProps, filterProps, searchProps, sortProps) {
            return _react["default"].createElement(_this6.PaginationContext.Provider, {
              ref: function ref(n) {
                return _this6.paginationContext = n;
              },
              pagination: _this6.props.pagination,
              data: rootProps.getData(filterProps, searchProps, sortProps),
              bootstrap4: _this6.props.bootstrap4,
              isRemotePagination: _this6.isRemotePagination,
              remoteEmitter: _this6.remoteEmitter,
              onDataSizeChange: _this6.props.onDataSizeChange
            }, _react["default"].createElement(_this6.PaginationContext.Consumer, null, function (paginationProps) {
              return base(rootProps, filterProps, searchProps, sortProps, paginationProps);
            }));
          };
        }
      }, {
        key: "renderWithSortCtx",
        value: function renderWithSortCtx(base, baseProps) {
          var _this7 = this;

          return function (rootProps, filterProps, searchProps) {
            return _react["default"].createElement(_this7.SortContext.Provider, _extends({}, baseProps, {
              ref: function ref(n) {
                return _this7.sortContext = n;
              },
              defaultSorted: _this7.props.defaultSorted,
              defaultSortDirection: _this7.props.defaultSortDirection,
              sort: _this7.props.sort,
              data: rootProps.getData(filterProps, searchProps)
            }), _react["default"].createElement(_this7.SortContext.Consumer, null, function (sortProps) {
              return base(rootProps, filterProps, searchProps, sortProps);
            }));
          };
        }
      }, {
        key: "renderWithSearchCtx",
        value: function renderWithSearchCtx(base, baseProps) {
          var _this8 = this;

          return function (rootProps, filterProps) {
            return _react["default"].createElement(_this8.SearchContext.Provider, _extends({}, baseProps, {
              ref: function ref(n) {
                return _this8.searchContext = n;
              },
              data: rootProps.getData(filterProps),
              searchText: _this8.props.search.searchText,
              dataChangeListener: _this8.props.dataChangeListener
            }), _react["default"].createElement(_this8.SearchContext.Consumer, null, function (searchProps) {
              return base(rootProps, filterProps, searchProps);
            }));
          };
        }
      }, {
        key: "renderWithFilterCtx",
        value: function renderWithFilterCtx(base, baseProps) {
          var _this9 = this;

          return function (rootProps) {
            return _react["default"].createElement(_this9.FilterContext.Provider, _extends({}, baseProps, {
              ref: function ref(n) {
                return _this9.filterContext = n;
              },
              data: rootProps.getData(),
              dataChangeListener: _this9.props.dataChangeListener
            }), _react["default"].createElement(_this9.FilterContext.Consumer, null, function (filterProps) {
              return base(rootProps, filterProps);
            }));
          };
        }
      }, {
        key: "renderWithCellEditCtx",
        value: function renderWithCellEditCtx(base, baseProps) {
          var _this10 = this;

          return function (rootProps) {
            return _react["default"].createElement(_this10.CellEditContext.Provider, _extends({}, baseProps, {
              ref: function ref(n) {
                return _this10.cellEditContext = n;
              },
              selectRow: _this10.props.selectRow,
              cellEdit: _this10.props.cellEdit,
              data: rootProps.getData()
            }), base(rootProps));
          };
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props,
              keyField = _this$props.keyField,
              columns = _this$props.columns,
              bootstrap4 = _this$props.bootstrap4;
          var baseProps = {
            keyField: keyField,
            columns: columns
          };
          var base = this.renderBase();

          if (this.ColumnManagementContext) {
            base = this.renderWithColumnManagementCtx(base, baseProps);
          }

          if (this.SelectionContext) {
            base = this.renderWithSelectionCtx(base, baseProps);
          }

          if (this.RowExpandContext) {
            base = this.renderWithRowExpandCtx(base, baseProps);
          }

          if (this.PaginationContext) {
            base = this.renderWithPaginationCtx(base, baseProps);
          }

          if (this.SortContext) {
            base = this.renderWithSortCtx(base, baseProps);
          }

          if (this.SearchContext) {
            base = this.renderWithSearchCtx(base, baseProps);
          }

          if (this.FilterContext) {
            base = this.renderWithFilterCtx(base, baseProps);
          }

          if (this.CellEditContext) {
            base = this.renderWithCellEditCtx(base, baseProps);
          }

          return _react["default"].createElement(_bootstrap.BootstrapContext.Provider, {
            value: {
              bootstrap4: bootstrap4
            }
          }, _react["default"].createElement(this.DataContext.Provider, _extends({}, baseProps, {
            data: this.props.data
          }), _react["default"].createElement(this.DataContext.Consumer, null, base)));
        }
      }]);

      return BootstrapTableContainer;
    }((0, _remoteResolver2["default"])(_react.Component))
  );
};

var _default = withContext;
exports["default"] = _default;