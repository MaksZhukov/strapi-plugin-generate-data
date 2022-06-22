"use strict";
exports.__esModule = true;
exports["default"] = (function (_a) {
    var strapi = _a.strapi;
    return ({
        index: function (ctx) {
            ctx.body = strapi
                .plugin("generate-data")
                .service("myService")
                .getWelcomeMessage();
        },
        flush: function (ctx) {
            var contentType = ctx.params.contentType;
            return strapi.entityService.deleteMany(contentType);
        }
    });
});
