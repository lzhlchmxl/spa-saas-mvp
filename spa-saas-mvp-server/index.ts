import Express from 'express';
import dotenv from 'dotenv';
import Path from 'node:path';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import clientRoutes from './routes/client';
import session from 'express-session';

dotenv.config();

export const app = Express();

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const host = process.env.HOST ||  "127.0.0.1";

// cors middleware
app.use(cors());
// Parse JSON requests automatically
app.use(Express.json());

const uri = process.env.ATLAS_URI || "";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// Serve static files from the latest production React app build
app.use(Express.static(Path.join('..', 'spa-saas-mvp-client', 'build')));
app.use(Express.static(Path.join(__dirname, 'public')));

// Serve index.html to all other routes
app.get('/*', (_req, res) => {
  res.sendFile(Path.join(process.cwd(), '..', 'spa-saas-mvp-client' ,'build', 'index.html'));
});


// Create session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  name: process.env.SESSION_NAME || "",
  secret: process.env.SESSION_SECRET || "",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: true,
    secure: true
  }
}))

app.get('/', (_req, res) => {
  res.send('Express + TypeScript Server');
});

// When hitting /users in the browser, it will show everything inside usersRouter
app.use('/users', usersRouter);

// Protected routes for clients
app.use('/client', clientRoutes);

// Routes for vendors
// app.use('/vendor', vendorRoutes);

// Run the server
app.listen(port, host, () => {
  console.log(`Server running at host ${host} on port ${port}`);
});
