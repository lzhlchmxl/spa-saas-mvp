"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const host = process.env.HOST || "127.0.0.1";
// cors middleware
app.use((0, cors_1.default)());
// Parse JSON requests automatically
app.use(express_1.default.json());
const uri = process.env.ATLAS_URI || "";
mongoose_1.default.connect(uri);
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
// Serve static files from the latest production React app build
app.use(express_1.default.static(node_path_1.default.join('..', 'spa-saas-mvp-client', 'build')));
app.use(express_1.default.static(node_path_1.default.join(__dirname, 'public')));
app.get('/', (_req, res) => {
    res.send('Express + TypeScript Server');
});
// Serve index.html to all other routes
// app.get('/*', (_req, res) => {
//   res.sendFile(Path.join(process.cwd(), '..','build', 'index.html'));
// });
// When hitting /users in the browser, it will show everything inside usersRouter
app.use('/users', users_1.default);
// Run the server
app.listen(port, host, () => {
    console.log(`Server running at host ${host} on port ${port}`);
});
