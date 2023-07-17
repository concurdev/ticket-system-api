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
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../utils/utils");
var RandomClients;
(function (RandomClients) {
    RandomClients["CLIENT1"] = "CONDOR";
    RandomClients["CLIENT2"] = "MIAT";
    RandomClients["CLIENT3"] = "SAS";
})(RandomClients || (RandomClients = {}));
var RandomIssues;
(function (RandomIssues) {
    RandomIssues["ISSUE1"] = "Message 1";
    RandomIssues["ISSUE2"] = "Message 2";
    RandomIssues["ISSUE3"] = "Message 3";
})(RandomIssues || (RandomIssues = {}));
class TicketModel {
    constructor() {
        this.getAllTickets = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return this.model.find().select({ _id: 0, __v: 0 }).sort({ deadline: -1 });
            }
            catch (error) {
                throw new Error('Failed to retrieve all tickets.');
            }
        });
        this.insertTicket = (client, issue) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketInstance = new this.model({ client, issue });
                return ticketInstance.save();
            }
            catch (error) {
                throw new Error('Failed to insert ticket.');
            }
        });
        this.updateTicket = (ticket, issue, status) => __awaiter(this, void 0, void 0, function* () {
            try {
                return this.model.findOneAndUpdate({ ticket }, { issue, status }, { new: true });
            }
            catch (error) {
                throw new Error('Failed to update ticket.');
            }
        });
        if (!mongoose_1.default.models.Ticket) {
            const ticketsSchema = new mongoose_1.default.Schema({
                ticket: { type: String, unique: true, immutable: true },
                client: { type: String, immutable: true },
                issue: { type: String },
                status: { type: String, required: true, default: 'open' },
                deadline: { type: Date, required: true, default: Date.now },
                date: { type: Date, required: true, immutable: true, default: Date.now },
            }, { collection: 'tickets' });
            ticketsSchema.pre('save', function (next) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (!this.isNew) {
                            return next();
                        }
                        this.deadline = (0, utils_1.generateRandomDeadline)();
                        this.ticket = `IF${(0, utils_1.generateRandomNumber)(10)}`;
                        this.client = this.client || (0, utils_1.generateRandomValue)(RandomClients);
                        this.issue = this.issue || (0, utils_1.generateRandomValue)(RandomIssues);
                        next();
                    }
                    catch (error) {
                        next(error);
                    }
                });
            });
            this.model = mongoose_1.default.model('Ticket', ticketsSchema);
        }
        else {
            this.model = mongoose_1.default.models.Ticket;
        }
    }
}
exports.default = new TicketModel();
//# sourceMappingURL=ticket-model.js.map