"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonWebToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("../config/envs");
class JsonWebToken {
    static generateToken(payload) {
        const token = jsonwebtoken_1.default.sign(payload, envs_1.envs.SECTRET_KEY, { expiresIn: '3h' });
        return token;
    }
    static decodedToken(token) {
        const decoded = jsonwebtoken_1.default.verify(token, envs_1.envs.SECTRET_KEY);
        return decoded;
    }
}
exports.JsonWebToken = JsonWebToken;
