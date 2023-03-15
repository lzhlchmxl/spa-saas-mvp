"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.data && req.session.data.userId) {
        // If user is authenticated, call next() to pass control to the next middleware
        return next();
    }
    // If user is not authenticated, redirect to login page
    res.status(401).send('Please login');
};
exports.isAuthenticated = isAuthenticated;
const isAuthorized = (req, res, next) => {
    var _a, _b, _c;
    const isAuthRequiredMethod = req.method === 'GET' || req.method === 'PUT' || req.method === 'POST' || req.method === 'DELETE';
    console.log((_a = req.session.data) === null || _a === void 0 ? void 0 : _a.role);
    if (((_b = req.session.data) === null || _b === void 0 ? void 0 : _b.role) === 'client' && isAuthRequiredMethod) {
        const allowedClientApiPattern = /^\/api\/client\/(.*)/;
        console.log(req.originalUrl);
        console.log(allowedClientApiPattern.test(req.originalUrl));
        if (!allowedClientApiPattern.test(req.originalUrl)) {
            return res.status(403).send('Forbidden');
        }
    }
    else if (((_c = req.session.data) === null || _c === void 0 ? void 0 : _c.role) === 'vendor' && isAuthRequiredMethod) {
        const allowedVendorApiPattern = /^\/api\/vendor\/(.*)/;
        if (!allowedVendorApiPattern.test(req.originalUrl)) {
            return res.status(403).send('Forbidden');
        }
    }
    // If user is authenticated and authorized, call next() to pass control to the next middleware
    next();
};
exports.isAuthorized = isAuthorized;
