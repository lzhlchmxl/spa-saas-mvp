import express from 'express';
import { isAuthenticated } from '../middleware';

const router = express.Router();

// Route for client dashboard
router.get('/', isAuthenticated, (req, res) => {

  

  res.send('This is the client dashboard');
});

export default router;