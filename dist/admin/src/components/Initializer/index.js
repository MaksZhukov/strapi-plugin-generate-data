"use strict";
/**
 *
 * Initializer
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var pluginId_1 = __importDefault(require("../../pluginId"));
var Initializer = function (_a) {
    var setPlugin = _a.setPlugin;
    var ref = (0, react_1.useRef)(null);
    ref.current = setPlugin;
    (0, react_1.useEffect)(function () {
        ref.current(pluginId_1["default"]);
    }, []);
    return null;
};
exports["default"] = Initializer;
