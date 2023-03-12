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
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
/*
  GET list of users
*/
router.route('/').get((_req, res) => {
    // mongoose method to get a list of all users in mongoDB
    user_model_1.default.find()
        .then(users => res.json(users)) // returning all users
        .catch(err => res.status(400).json('Error: ' + err));
});
/*
  POST add new user to database
*/
router.route('/add').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // [CAUTION] this might not be a great pattern, I feel I'm not typingscripting this correctly
    try {
        const user = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
        user.password = hashedPassword;
        const newUser = new user_model_1.default(user);
        newUser.save();
    }
    catch (err) {
        res.status(400).json('Error ' + err);
    }
    finally {
        res.json('User added!');
    }
}));
/*
  POST user login
*/
router.route('/login').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ username: req.body.username });
    if (user === null) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Check password
    const passwordMatch = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Create session
    // req.session.userId = user._id;
    // Redirect to protected route
    res.json(user);
}));
exports.default = router;
