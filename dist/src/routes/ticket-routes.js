"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_middleware_1 = __importDefault(require("../middleware/ticket-middleware"));
const error_middleware_1 = __importDefault(require("../middleware/error-middleware"));
const ticket_controller_1 = __importDefault(require("../controllers/ticket-controller"));
const router = express_1.default.Router();
router
    .get('/tickets', [ticket_middleware_1.default.listAllTickets], ticket_controller_1.default.getAllTickets)
    .post('/tickets', [ticket_middleware_1.default.createTicket], ticket_controller_1.default.insertTicket)
    .put('/tickets/:id', [ticket_middleware_1.default.updateTicket], ticket_controller_1.default.update)
    .use(error_middleware_1.default.handleError);
exports.default = router;
//# sourceMappingURL=ticket-routes.js.map