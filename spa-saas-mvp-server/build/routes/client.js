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
const middleware_1 = require("../middleware");
const clientProfile_model_1 = __importDefault(require("../models/clientProfile.model"));
const router = express_1.default.Router();
/*
    GET /api/client/profile
    Description:
    Request body: no request body
    Response body: ClientProfile
*/
router.route('/profile').get(middleware_1.isAuthenticated, middleware_1.isAuthorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const profile = yield clientProfile_model_1.default.findOne({ userId: (_a = req.session.data) === null || _a === void 0 ? void 0 : _a.userId });
    if (profile === null) {
        res.status(404).send();
    }
    else {
        res.status(200).send(profile);
    }
}));
/*
    POST /api/client/profile/create
    Description:
    Request body: ClientProfile
    Response body:
*/
router.route('/profile/create').post(middleware_1.isAuthenticated, middleware_1.isAuthorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const profile = Object.assign(Object.assign({}, req.body), { userId: (_b = req.session.data) === null || _b === void 0 ? void 0 : _b.userId });
    try {
        const newProfile = new clientProfile_model_1.default(profile);
        yield newProfile.save();
        res.status(200).json({ message: 'Profile sucessfully created.' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error has occurred when creating the profile.' });
    }
}));
/*
    PUT /api/client/profile/update
    Description:
    Request body: ClientProfile
    Response body:
*/
router.route('/profile/update').put(middleware_1.isAuthenticated, middleware_1.isAuthorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        yield clientProfile_model_1.default.findOneAndUpdate({ userId: (_c = req.session.data) === null || _c === void 0 ? void 0 : _c.userId }, req.body);
        res.status(200).json({ message: 'Profile sucessfully updated.' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error has occurred when updating the profile.' });
    }
}));
/*
    DELETE /api/client/profile/delete
    Description:
    Request body:
    Response body:
*/
router.route('/profile/delete').delete(middleware_1.isAuthenticated, middleware_1.isAuthorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        yield clientProfile_model_1.default.findOneAndDelete({ userId: (_d = req.session.data) === null || _d === void 0 ? void 0 : _d.userId });
        res.status(200).json({ message: 'Profile sucessfully deleted.' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error has occurred when deleting the profile.' });
    }
}));
exports.default = router;
