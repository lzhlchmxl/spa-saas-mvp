"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const host = process.env.HOST || "127.0.0.1";
// Serve static files from the latest production React app build
app.use(express_1.default.static(node_path_1.default.join('..', 'spa-saas-mvp-client', 'build')));
app.use(express_1.default.static(node_path_1.default.join(__dirname, 'public')));
// Parse JSON requests automatically
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// Serve index.html to all other routes
app.get('/*', (_req, res) => {
    res.sendFile(node_path_1.default.join(process.cwd(), '..', 'build', 'index.html'));
});
// Run the server
app.listen(port, host, () => {
    console.log(`Server running at host ${host} on port ${port}`);
});
