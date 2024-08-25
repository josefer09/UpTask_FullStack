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
exports.MongoDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
class MongoDatabase {
    static connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mongoUrl, dbName } = options;
            try {
                yield mongoose_1.default.connect(mongoUrl, {
                    dbName
                });
                console.log(colors_1.default.green.bold('Mongo DB connection succefully'));
                return true;
            }
            catch (error) {
                console.log(colors_1.default.red.bold('Mongo connection error'));
                throw error;
            }
        });
    }
    static disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.disconnect();
        });
    }
}
exports.MongoDatabase = MongoDatabase;
