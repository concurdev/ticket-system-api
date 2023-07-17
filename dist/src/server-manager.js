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
const logger_1 = require("./utils/logger");
const async_mutex_1 = require("async-mutex");
class ServerManager {
    constructor(maxConcurrentRequests) {
        this.concurrentRequests = 0;
        this.maxConcurrentRequests = maxConcurrentRequests;
        this.isServiceDenied = false;
        this.lock = new async_mutex_1.Semaphore(this.maxConcurrentRequests);
    }
    handleRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isServiceDenied) {
                logger_1.Log.error('C O N C U R R E N C Y: Service denied. Server is overloaded.');
                res.status(503).json({ error: 'Service denied. Server is overloaded.' });
                return;
            }
            try {
                yield this.lock.acquire();
                this.logConcurrencyLevel();
                this.concurrentRequests++;
                if (this.concurrentRequests > this.maxConcurrentRequests) {
                    this.isServiceDenied = true;
                    logger_1.Log.error('C O N C U R R E N C Y: Server is overloaded. Service denied for this request');
                    res.status(503).json({ error: 'Service denied. Server is overloaded' });
                    return;
                }
                next();
            }
            finally {
                this.concurrentRequests--;
                this.lock.release();
            }
        });
    }
    logConcurrencyLevel() {
        if (this.concurrentRequests > 10) {
            logger_1.Log.error('C O N C U R R E N C Y: Server is overloaded. Service denied for this request');
        }
        else if (this.concurrentRequests > 5) {
            logger_1.Log.warn('C O N C U R R E N C Y: High! Consider optimizing server performance');
        }
        else if (this.concurrentRequests > 2) {
            logger_1.Log.info('C O N C U R R E N C Y: Moderate');
        }
    }
}
exports.default = ServerManager;
//# sourceMappingURL=server-manager.js.map