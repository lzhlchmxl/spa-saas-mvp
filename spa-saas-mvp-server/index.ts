import Express from 'express';
import dotenv from 'dotenv';
import Path from 'node:path';

dotenv.config();

const app = Express();

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const host = process.env.HOST ||  "127.0.0.1";

// Serve static files from the latest production React app build
app.use(Express.static(Path.join('..', 'spa-saas-mvp-client', 'build')));
app.use(Express.static(Path.join(__dirname, 'public')));

// Parse JSON requests automatically
app.use(Express.json());


app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

// Serve index.html to all other routes
app.get('/*', (_req, res) => {
  res.sendFile(Path.join(process.cwd(), '..','build', 'index.html'));
});

// Run the server
app.listen(port, host, () => {
  console.log(`Server running at host ${host} on port ${port}`);
});
