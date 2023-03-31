 import Express from 'express';
import dotenv from 'dotenv';
import Path from 'node:path';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import clientRoutes from './routes/client';
import vendorRoutes from './routes/vendor';
import adminRoutes from './routes/admin';
import session from 'express-session';
import MongoStore from 'connect-mongo';

dotenv.config();

export const app = Express();

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const host = process.env.HOST ||  "127.0.0.1";

// cors middleware
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
}));
// Parse JSON requests automatically
app.use(Express.json());

const uri = process.env.ATLAS_URI || "";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.ATLAS_URI,
    ttl: 14 * 24 * 60 * 60, // 14 days
    autoRemove: 'native' 
  })
}))

// Serve static files from the latest production React app build
app.use(Express.static(Path.join('..', 'spa-saas-mvp-client', 'build')));
app.use(Express.static(Path.join(__dirname, 'public')));

// When hitting /users in the browser, it will show everything inside usersRouter
app.use('/api/users', usersRouter);

// Protected routes for clients
app.use('/api/client', clientRoutes);

// Routes for vendors
app.use('/api/vendor', vendorRoutes);

// Routes for admin
app.use('/api/admin', adminRoutes);

// Serve index.html to all other routes
app.get('*', (_req, res) => {
  res.sendFile(Path.join(process.cwd(), '..', 'spa-saas-mvp-client' ,'build', 'index.html'));
});

// Run the server
app.listen(port, host, () => {
  console.log(`Server running at host ${host} on port ${port}`);
});
