"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
const router = express_1.default.Router();
// hostname/users/
router.route('/').get((_req, res) => {
    // mongoose method to get a list of all users in mongoDB
    user_model_1.default.find()
        .then(users => res.json(users)) // returning all users
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
    // [CAUTION] this might not be a great pattern, I feel I'm not typingscripting this correctly
    const user = req.body;
    const newUser = new user_model_1.default(user);
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error ' + err));
});
exports.default = router;
