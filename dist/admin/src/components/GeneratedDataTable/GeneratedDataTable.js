"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Table_1 = require("@strapi/design-system/Table");
var Pagination_1 = require("@strapi/design-system/v2/Pagination");
var COUNT_PAGINATION_ROWS = 25;
var GeneratedDataTable = function (_a) {
    var data = _a.data;
    var _b = (0, react_1.useState)(1), activePage = _b[0], setActivePage = _b[1];
    (0, react_1.useEffect)(function () {
        setActivePage(1);
    }, [data.length]);
    var handleChangePagination = function (page) { return function () {
        setActivePage(page);
    }; };
    var pageCount = Math.floor(data.length / COUNT_PAGINATION_ROWS);
    return ((0, jsx_runtime_1.jsxs)(Table_1.Table, __assign({ footer: (0, jsx_runtime_1.jsx)(Pagination_1.Pagination, __assign({ activePage: activePage, pageCount: pageCount, className: 'hello' }, { children: new Array(pageCount).fill(null).map(function (item, index) { return ((0, jsx_runtime_1.jsxs)(Pagination_1.PageLink, __assign({ number: index + 1, onClick: handleChangePagination(index + 1) }, { children: ["Go to page ", index + 1] }))); }) })) }, { children: [(0, jsx_runtime_1.jsx)(Table_1.Thead, { children: (0, jsx_runtime_1.jsxs)(Table_1.Tr, { children: [(0, jsx_runtime_1.jsx)(Table_1.Th, { children: "row" }), Object.keys(data[0]).map(function (key) { return ((0, jsx_runtime_1.jsx)(Table_1.Th, { children: key })); })] }) }), (0, jsx_runtime_1.jsx)(Table_1.Tbody, { children: data
                    .slice((activePage - 1) * COUNT_PAGINATION_ROWS, COUNT_PAGINATION_ROWS * activePage)
                    .map(function (item, index) { return ((0, jsx_runtime_1.jsxs)(Table_1.Tr, { children: [(0, jsx_runtime_1.jsx)(Table_1.Td, { children: index +
                                1 +
                                (activePage - 1) * COUNT_PAGINATION_ROWS }), Object.keys(item).map(function (key) { return ((0, jsx_runtime_1.jsx)(Table_1.Td, { children: item[key] })); })] })); }) })] })));
};
exports["default"] = GeneratedDataTable;
