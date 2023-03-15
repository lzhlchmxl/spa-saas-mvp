"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const vendorProfileSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    businessName: {
        type: String,
        required: true,
        trim: true,
    },
    businessAddress: {
        type: String,
        required: true,
    },
    services: {
        type: [String],
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('VendorProfile', vendorProfileSchema);
