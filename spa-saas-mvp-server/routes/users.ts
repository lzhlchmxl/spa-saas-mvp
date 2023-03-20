import express from 'express';
import dotenv from 'dotenv';
import User, { UserInterface } from '../models/user.model';
import bcrypt from 'bcrypt';
import session from 'express-session';


dotenv.config();

const router = express.Router();

declare module 'express-session' {
  interface Session {
    data: {
      userId: string;
      role: 'vendor' | 'client' | 'admin';
    } | null
  }
}

/* 
  GET /api/users to return the correct logged in user if any
*/
router.route('/').get( async (req, res) => {
  try {
    if (!req.session) {
      throw new Error('Session middleware not set up correctly');
    }

    if (!req.session.data) {
      res.status(401).json({ Error: 'User is not logged in.'});
    }

    const userRole = req.session.data?.role;
    res.status(200).json({ role: userRole });

  } catch (err) {
    res.status(400).json('Error ' + err);
  } 
});

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

    if (!req.session) {
      throw new Error('Session middleware not set up correctly');
    }

    // Add new user data to session
    req.session.data = {
      userId: newUser._id.toString(),
      role: newUser.role,
    }

    req.session.save((err) => {
      if (err) {
        throw err;
      }

      res.status(200).json({ redirect: `/${newUser.role}` });
    });
    
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
    if (!req.session) {
      throw new Error('Session middleware not set up correctly');
    }

    // Add userId to session
    if (!req.session.data) {
      req.session.data = {
        userId: user._id.toString(),
        role: user.role,
      };
    } else {
      req.session.data = {
        userId: user._id.toString(),
        role: user.role,
      }
    }

    req.session.save((err) => {
      if (err) {
        throw err;
      }

      res.status(200).json({ redirect: `/${user.role}` });
    });
  } catch (err: Error | any) { // [TODO]
    console.error(err); 
    res.status(500).json({ message: 'Error addig userId to session'})
  }

})


/* 
  DELETE user logout
*/
router.route('/logout').delete(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging out' });
    } else {
      res.status(200).json({ redirect: '/' });
    }
  });
});

export default router;