import express from 'express';
import dotenv from 'dotenv';
import User, { UserInterface } from '../models/user.model';
import bcrypt from 'bcrypt';
import session from "express-session";
import crypto from 'crypto';
import { app } from '../index';

dotenv.config();

const router = express.Router();

/* 
  GET list of users
*/ 
router.route('/').get((_req, res) => { // hostname/users/ 
  // mongoose method to get a list of all users in mongoDB
  User.find()
    .then(users => res.json(users)) // returning all users
    .catch(err => res.status(400).json('Error: ' + err));
})

/* 
  POST add new user to database
*/
router.route('/add').post( async (req, res) => {
  // [CAUTION] this might not be a great pattern, I feel I'm not typingscripting this correctly
  try {
    const user: UserInterface = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const newUser = new User(user);
    newUser.save();
  } catch (err) {
    res.status(400).json('Error ' + err);
  } finally {
    res.json('User added!');
  }
})

/* 
  POST user login
*/
router.route('/login').post( async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user === null) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Check password
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Create session
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }))

  // Create session
  // req.session.userId = user._id;

  // Redirect to protected route
  res.json(user)

})

export default router;