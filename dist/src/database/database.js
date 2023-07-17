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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logger_1 = require("../utils/logger");
const MAX_CONNECTIONS = 400;
const THRESHOLD_PERCENTAGE = 0.85;
class Database {
    constructor() {
        this.isReplicationInProgress = false;
    }
    connect(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, mongoose_1.connect)(uri);
                logger_1.Log.info('Connected to MongoDB');
                this.monitorConnectionPool();
            }
            catch (error) {
                logger_1.Log.error(`MongoDB connection error: ${error}`);
            }
        });
    }
    monitorConnectionPool() {
        const connectionPool = mongoose_1.connections.length;
        const currentPercentage = connectionPool / MAX_CONNECTIONS;
        if (currentPercentage >= THRESHOLD_PERCENTAGE && currentPercentage < 0.9) {
            logger_1.Log.warn('Number of connections is increasing. Consider scaling or optimizing your MongoDB deployment.');
        }
        else if (currentPercentage >= 0.9 && !this.isReplicationInProgress) {
            logger_1.Log.info(`Current connection pool size: ${connectionPool}`);
            this.initiateReplication();
        }
        setTimeout(() => this.monitorConnectionPool(), 10000);
    }
    initiateReplication() {
        this.isReplicationInProgress = true;
        this.isReplicationInProgress = false;
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map