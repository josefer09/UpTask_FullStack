"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const envs_1 = require("./envs");
exports.corsConfig = {
    origin: function (origin, callback) {
        const whiteList = [envs_1.envs.FRONTEND_URL];
        if (whiteList.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('CORS Error'), false);
        }
    }
};
