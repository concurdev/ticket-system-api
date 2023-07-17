"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const winston_1 = __importDefault(require("winston"));
const env_1 = require("./env");
class Logger {
    constructor() {
        const customFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
            return `ticket-system-api | ${(0, env_1.requireEnv)('NODE_ENV')} run @ ${timestamp} | ${level}: ${message}`;
        });
        const generalTransport = new winston_1.default.transports.File({ filename: 'logs.log' });
        const errorTransport = new winston_1.default.transports.File({ filename: 'error.log', level: 'error' });
        this.logger = winston_1.default.createLogger({
            transports: [
                new winston_1.default.transports.Console(),
                generalTransport,
                errorTransport
            ],
            format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), customFormat)
        });
    }
    info(message) {
        this.logger.info(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    error(message) {
        this.logger.error(message);
    }
}
exports.Log = new Logger();
//# sourceMappingURL=logger.js.map