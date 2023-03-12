import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.data && req.session.data.userId) {
    // If user is authenticated, call next() to pass control to the next middleware
    return next();
  }
  // If user is not authenticated, redirect to login page
  res.redirect('/login');
};