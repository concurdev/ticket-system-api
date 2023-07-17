"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const logger_1 = require("./src/utils/logger");
const ticket_routes_1 = __importDefault(require("./src/routes/ticket-routes"));
const database_1 = __importDefault(require("./src/database/database"));
const server_manager_1 = __importDefault(require("./src/server-manager"));
const env_1 = require("./src/utils/env");
class Server {
    constructor() {
        dotenv.config();
        this.app = (0, express_1.default)();
        this.port = (0, env_1.requireEnv)('NODE_ENV') === 'PROD' ? (0, env_1.requireIntEnv)('PROD_PORT') : (0, env_1.requireIntEnv)('DEV_PORT');
        this.uri = (0, env_1.requireEnv)('NODE_ENV') === 'PROD' ? (0, env_1.requireEnv)('PROD_MONGODB_URI') : (0, env_1.requireEnv)('DEV_MONGODB_URI');
        this.database = new database_1.default();
        this.serverManager = new server_manager_1.default(1000);
        this.setupMiddleware();
        this.setupRoutes();
        this.connectToDatabase();
    }
    setupMiddleware() {
        this.app.use(express_1.default.json());
    }
    setupRoutes() {
        this.app.use((req, res, next) => {
            this.serverManager.handleRequest(req, res, next);
        });
        this.app.use('/api/v1', ticket_routes_1.default);
    }
    connectToDatabase() {
        this.database.connect(this.uri);
    }
    start() {
        this.app.listen(this.port, () => {
            logger_1.Log.info(`Server running @ http://localhost:${this.port}`);
        });
    }
}
exports.server = new Server();
exports.server.start();
//# sourceMappingURL=server.js.map