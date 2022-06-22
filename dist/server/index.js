"use strict";
exports.__esModule = true;
var register_1 = require("./register");
var bootstrap_1 = require("./bootstrap");
var destroy_1 = require("./destroy");
var config_1 = require("./config");
var content_types_1 = require("./content-types");
var controllers_1 = require("./controllers");
var routes_1 = require("./routes");
var middlewares_1 = require("./middlewares");
var policies_1 = require("./policies");
var services_1 = require("./services");
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
