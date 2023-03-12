import express from 'express';
import dotenv from 'dotenv';
import User, { UserInterface } from '../models/user.model';
import bcrypt from 'bcrypt';

dotenv.config();

const router = express.Router();

declare module 'express-session' {
  interface Session {
    data: {
      userId: string;
    };
  }
}

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
router.route('/register').post( async (req, res) => {
  try {
    const userReqBody: UserInterface = req.body;

    const user = await User.findOne({ username: userReqBody.username });

    if (user !== null) {
      return res.status(400).json({ message: 'The username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(userReqBody.password, 10);
    userReqBody.password = hashedPassword;
    const newUser = new User(userReqBody);
    await newUser.save();

    
    // Add userId to session
    req.session.data.userId = newUser._id.toString();

    // Redirect to protected routes
    if (newUser.role === "client") {
      
       
      res.redirect('/client/dashboard');

    } else if (newUser.role === "vendor") {

    } else {

    }
    
  } catch (err) {
    res.status(400).json('Error ' + err);
  } 
});

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

  try {
    // Add userId to session
    req.session.data.userId = user._id.toString();

    res.redirect('/dashboard')
  } catch (err: Error | any) { // [TODO]
    res.status(400).json({ message: err.message})
  }

})

export default router;