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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const utils_1 = require("../../utils");
const jsonWebToken_1 = require("../../utils/jsonWebToken");
const User_1 = __importDefault(require("../../model/User"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = utils_1.CustomError.unauthorized('Unauthorized');
        res.status(error.statusCode).json({ error: error.message });
        return next(error);
    }
    const token = bearer.split(' ')[1];
    try {
        const decoded = jsonWebToken_1.JsonWebToken.decodedToken(token);
        if (typeof decoded === 'object' && decoded.id) {
            const user = yield User_1.default.findById(decoded.id).select(' _id name email ');
            if (!user)
                return res.status(500).json({ error: 'Token not valid' });
            req.user = user;
        }
        next();
    }
    catch (error) {
        console.log(error);
        if (error instanceof utils_1.CustomError)
            return next(error);
        console.log(error);
        const serverError = utils_1.CustomError.internalServer('Token not valid');
        res.status(500).json({ error: serverError.message });
        return next(serverError);
    }
});
exports.authenticate = authenticate;
