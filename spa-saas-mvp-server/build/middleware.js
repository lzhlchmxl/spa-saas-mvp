"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.data && req.session.data.userId) {
        // If user is authenticated, call next() to pass control to the next middleware
        return next();
    }
    // If user is not authenticated, redirect to login page
    res.redirect('/login');
};
exports.isAuthenticated = isAuthenticated;
