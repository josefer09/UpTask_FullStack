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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const colors_1 = __importDefault(require("colors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Cors
            this.app.use((0, cors_1.default)({
                origin: "*"
            }));
            //* Middlewares
            // Servir archivos estáticos desde la carpeta 'public'
            this.app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
            this.app.use((0, morgan_1.default)('dev')); // Logs from API
            this.app.use(express_1.default.json()); // Raw
            this.app.use(express_1.default.urlencoded({ extended: true })); // x-www-form-urlencoded
            //* Routes
            this.app.use(this.routes);
            this.serverListener = this.app.listen(this.port, () => {
                console.log(colors_1.default.cyan.bold(`Server executing on PORT ${this.port}`));
            });
        });
    }
    close() {
        var _a;
        (_a = this.serverListener) === null || _a === void 0 ? void 0 : _a.close();
    }
}
exports.Server = Server;
