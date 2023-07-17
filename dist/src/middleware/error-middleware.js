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
const http_errors_1 = __importDefault(require("http-errors"));
const logger_1 = require("../utils/logger");
class ErrorMiddleware {
    constructor() {
        this.handleError = (error, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (error instanceof http_errors_1.default.HttpError) {
                logger_1.Log.warn(`errorMiddleware HttpError: ${error}`);
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                logger_1.Log.error(`errorMiddleware Internal Server Error: ${error}`);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            next();
        });
    }
}
exports.default = new ErrorMiddleware();
//# sourceMappingURL=error-middleware.js.map