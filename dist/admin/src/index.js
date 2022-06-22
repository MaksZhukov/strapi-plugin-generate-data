"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var helper_plugin_1 = require("@strapi/helper-plugin");
var package_json_1 = require("../../package.json");
var pluginId_1 = require("./pluginId");
var Initializer_1 = require("./components/Initializer");
var PluginIcon_1 = require("./components/PluginIcon");
var displayName = package_json_1["default"].strapi.displayName;
exports["default"] = {
    register: function (app) {
        var _this = this;
        app.addMenuLink({
            to: "/plugins/".concat(pluginId_1["default"]),
            icon: PluginIcon_1["default"],
            intlLabel: {
                id: "".concat(pluginId_1["default"], ".plugin.name"),
                defaultMessage: displayName
            },
            Component: function () { return __awaiter(_this, void 0, void 0, function () {
                var component;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require(
                            /* webpackChunkName: "[request]" */ './pages/App'); })];
                        case 1:
                            component = _a.sent();
                            return [2 /*return*/, component];
                    }
                });
            }); },
            permissions: [
            // Uncomment to set the permissions of the plugin here
            // {
            //   action: '', // the action name should be plugin::plugin-name.actionType
            //   subject: null,
            // },
            ]
        });
        var plugin = {
            id: pluginId_1["default"],
            initializer: Initializer_1["default"],
            isReady: false,
            name: name
        };
        app.registerPlugin(plugin);
    },
    bootstrap: function (app) { },
    registerTrads: function (app) {
        return __awaiter(this, void 0, void 0, function () {
            var locales, importedTrads;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        locales = app.locales;
                        return [4 /*yield*/, Promise.all(locales.map(function (locale) {
                                return Promise.resolve().then(function () { return require("./translations/".concat(locale, ".json")); }).then(function (_a) {
                                    var data = _a["default"];
                                    return {
                                        data: (0, helper_plugin_1.prefixPluginTranslations)(data, pluginId_1["default"]),
                                        locale: locale
                                    };
                                })["catch"](function () {
                                    return {
                                        data: {},
                                        locale: locale
                                    };
                                });
                            }))];
                    case 1:
                        importedTrads = _a.sent();
                        return [2 /*return*/, Promise.resolve(importedTrads)];
                }
            });
        });
    }
};
