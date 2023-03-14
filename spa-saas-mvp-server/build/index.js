"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const client_1 = __importDefault(require("./routes/client"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const host = process.env.HOST || "127.0.0.1";
// cors middleware
exports.app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}));
// Parse JSON requests automatically
exports.app.use(express_1.default.json());
const uri = process.env.ATLAS_URI || "";
mongoose_1.default.connect(uri);
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
exports.app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.ATLAS_URI,
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    })
}));
// Serve static files from the latest production React app build
exports.app.use(express_1.default.static(node_path_1.default.join('..', 'spa-saas-mvp-client', 'build')));
exports.app.use(express_1.default.static(node_path_1.default.join(__dirname, 'public')));
// When hitting /users in the browser, it will show everything inside usersRouter
exports.app.use('/api/users', users_1.default);
// Protected routes for clients
exports.app.use('/api/client', client_1.default);
// Routes for vendors
// app.use('/vendor', vendorRoutes);
// Serve index.html to all other routes
exports.app.get('*', (_req, res) => {
    res.sendFile(node_path_1.default.join(process.cwd(), '..', 'spa-saas-mvp-client', 'build', 'index.html'));
});
// Run the server
exports.app.listen(port, host, () => {
    console.log(`Server running at host ${host} on port ${port}`);
});
