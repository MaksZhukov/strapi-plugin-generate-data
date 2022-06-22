"use strict";
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var helper_plugin_1 = require("@strapi/helper-plugin");
var pluginId_1 = require("../../pluginId");
var HomePage_1 = require("../HomePage");
var App = function () {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Switch, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/plugins/".concat(pluginId_1["default"]), component: HomePage_1["default"], exact: true }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { component: helper_plugin_1.NotFound })] }) }));
};
exports["default"] = App;
