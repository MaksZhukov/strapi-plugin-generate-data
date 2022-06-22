"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pluginId_1 = __importDefault(require("../pluginId"));
var getTrad = function (id) { return "".concat(pluginId_1["default"], ".").concat(id); };
exports["default"] = getTrad;
