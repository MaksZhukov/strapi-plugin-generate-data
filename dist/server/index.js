"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var register_1 = __importDefault(require("./register"));
var bootstrap_1 = __importDefault(require("./bootstrap"));
var destroy_1 = __importDefault(require("./destroy"));
var config_1 = __importDefault(require("./config"));
var content_types_1 = __importDefault(require("./content-types"));
var controllers_1 = __importDefault(require("./controllers"));
var routes_1 = __importDefault(require("./routes"));
var middlewares_1 = __importDefault(require("./middlewares"));
var policies_1 = __importDefault(require("./policies"));
var services_1 = __importDefault(require("./services"));
exports["default"] = {
    register: register_1["default"],
    bootstrap: bootstrap_1["default"],
    destroy: destroy_1["default"],
    config: config_1["default"],
    controllers: controllers_1["default"],
    routes: routes_1["default"],
    services: services_1["default"],
    contentTypes: content_types_1["default"],
    policies: policies_1["default"],
    middlewares: middlewares_1["default"]
};
