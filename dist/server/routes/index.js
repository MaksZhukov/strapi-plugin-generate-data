"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: "GET",
        path: "/",
        handler: "myController.index",
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: "POST",
        path: "/flush/:contentType",
        handler: "myController.flush",
        config: {
            policies: [],
            auth: false,
        },
    },
];
