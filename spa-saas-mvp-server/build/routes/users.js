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
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const router = express_1.default.Router();
/*
  POST add new user to database
*/
router.route('/register').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userReqBody = req.body;
        const user = yield user_model_1.default.findOne({ username: userReqBody.username });
        if (user !== null) {
            return res.status(400).json({ message: 'The username is already taken' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(userReqBody.password, 10);
        userReqBody.password = hashedPassword;
        const newUser = new user_model_1.default(userReqBody);
        yield newUser.save();
        if (!req.session) {
            throw new Error('Session middleware not set up correctly');
        }
        // Add new user data to session
        req.session.data = {
            userId: newUser._id.toString(),
            role: newUser.role,
        };
        req.session.save((err) => {
            if (err) {
                throw err;
            }
            res.status(200).json({ redirect: `/${newUser.role}` });
        });
    }
    catch (err) {
        res.status(400).json('Error ' + err);
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
    try {
        if (!req.session) {
            throw new Error('Session middleware not set up correctly');
        }
        // Add userId to session
        if (!req.session.data) {
            req.session.data = {
                userId: user._id.toString(),
                role: user.role,
            };
        }
        else {
            req.session.data = {
                userId: user._id.toString(),
                role: user.role,
            };
        }
        req.session.save((err) => {
            if (err) {
                throw err;
            }
            res.status(200).json({ redirect: `/${user.role}` });
        });
    }
    catch (err) { // [TODO]
        console.error(err);
        res.status(500).json({ message: 'Error addig userId to session' });
    }
}));
/*
  DELETE user logout
*/
router.route('/logout').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error logging out' });
        }
        else {
            res.status(200).json({ redirect: '/' });
        }
    });
}));
exports.default = router;
