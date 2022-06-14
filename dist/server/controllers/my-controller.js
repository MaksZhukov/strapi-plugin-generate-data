"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    index(ctx) {
        ctx.body = strapi
            .plugin("generate-data")
            .service("myService")
            .getWelcomeMessage();
    },
    flush(ctx) {
        const { contentType } = ctx.params;
        return strapi.entityService.deleteMany(contentType);
    },
});
