"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
// Route for client dashboard
router.get('/', middleware_1.isAuthenticated, (req, res) => {
    res.send('This is the client dashboard');
});
exports.default = router;
