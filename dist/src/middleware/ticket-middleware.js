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
const ticket_model_1 = __importDefault(require("../models/ticket-model"));
const logger_1 = require("../utils/logger");
class TicketMiddleware {
    constructor() {
        this.handleError = (error, req, res, next, middleware) => {
            logger_1.Log.error(`Error in ${middleware}: ${error}`);
            next(error);
        };
        this.ticketModel = ticket_model_1.default;
        this.listAllTickets = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.Log.info('listAllTickets middleware called');
                const allTickets = yield this.ticketModel.getAllTickets();
                const success = true;
                const statusCode = 200;
                res.locals = { success, statusCode, data: { count: allTickets.length || 0, tickets: allTickets } };
                logger_1.Log.info('listAllTickets middleware exiting');
                next();
            }
            catch (error) {
                this.handleError(error, req, res, next, 'listAllTickets');
            }
        });
        this.createTicket = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { client: requestClient, issue: requestIssue } = req.body;
                let infoMessage = 'createTicket middleware called';
                infoMessage += requestClient ? ` for client: ${requestClient}` : ' for a "random client"';
                logger_1.Log.info(infoMessage);
                const ticket = yield this.ticketModel.insertTicket(requestClient, requestIssue);
                const success = true;
                const statusCode = 201;
                const message = 'Ticket created';
                const { ticket: ticketId, client, issue, status, deadline, date } = ticket;
                res.locals = { success, statusCode, message, ticket: ticketId, client, issue, status, deadline, date };
                logger_1.Log.info(`createTicket middleware exiting. Ticket "${ticketId}" created`);
                next();
            }
            catch (error) {
                this.handleError(error, req, res, next, 'createTicket');
            }
        });
        this.updateTicket = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ticket = req.params.id;
                logger_1.Log.info(`updateTicket middleware called for ticket: ${ticket}`);
                const { issue, status } = req.body;
                const updatedTicket = yield this.ticketModel.updateTicket(ticket, issue, status);
                if (!updatedTicket) {
                    const success = false;
                    const statusCode = 404;
                    const message = 'Ticket not found';
                    res.locals = { success, statusCode, message };
                    logger_1.Log.warn(`updateTicket middleware failed. Reason: "${message}"`);
                }
                else {
                    const success = true;
                    const statusCode = 200;
                    const message = 'Ticket updated';
                    const { ticket: ticketId, client, issue, status, deadline, date } = updatedTicket;
                    res.locals = { success, statusCode, message, ticket: ticketId, client, issue, status, deadline, date };
                    logger_1.Log.info(`updateTicket middleware exiting. Ticket "${ticketId}" updated`);
                }
                next();
            }
            catch (error) {
                this.handleError(error, req, res, next, 'updateTicket');
            }
        });
    }
}
exports.default = new TicketMiddleware();
//# sourceMappingURL=ticket-middleware.js.map