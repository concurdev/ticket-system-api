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
const logger_1 = require("../utils/logger");
class TicketController {
    constructor() {
        this.getAllTickets = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.Log.info('getAllTickets controller reached');
                const { count } = res.locals.data;
                res.status(res.locals.statusCode).send(res.locals);
                logger_1.Log.info(`getAllTickets controller exiting. Total ticket count: ${count}`);
            }
            catch (error) {
                this.handleControllerError(error, req, res, next, 'getAllTickets');
            }
        });
        this.insertTicket = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.Log.info('insertTicket controller reached');
                res.status(res.locals.statusCode).send(res.locals);
                let infoMessage = 'insertTicket controller exiting. ';
                infoMessage += !req.body.client ? `Randomly "${res.locals.client}" was chosen` : '';
                logger_1.Log.info(infoMessage);
            }
            catch (error) {
                this.handleControllerError(error, req, res, next, 'insertTicket');
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.Log.info('update controller reached');
                res.status(res.locals.statusCode).send(res.locals);
                if (res.locals.statusCode === 404) {
                    logger_1.Log.error(`update controller exiting. Ticket# ${req.params.id} not found`);
                }
                logger_1.Log.info('update controller exiting');
            }
            catch (error) {
                this.handleControllerError(error, req, res, next, 'update');
            }
        });
        this.handleControllerError = (error, req, res, next, controller) => {
            logger_1.Log.error(`Error in ${controller} controller: ${error}`);
            res.status(500).send({ message: 'Internal Server Error.' });
            next(error);
        };
    }
}
exports.default = new TicketController();
//# sourceMappingURL=ticket-controller.js.map