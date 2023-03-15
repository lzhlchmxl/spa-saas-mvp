import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.data && req.session.data.userId) {

    // If user is authenticated, call next() to pass control to the next middleware
    return next();
  }
  // If user is not authenticated, redirect to login page
  res.status(401).send('Please login');
};

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {

  const isAuthRequiredMethod = req.method === 'GET' || req.method === 'PUT' || req.method === 'POST' || req.method === 'DELETE';

  console.log(req.session.data?.role)
  if (req.session.data?.role === 'client' && isAuthRequiredMethod) {
    const allowedClientApiPattern = /^\/api\/client\/(.*)/;

    if (!allowedClientApiPattern.test(req.originalUrl )) {
      return res.status(403).send('Forbidden');
    }
  } else if (req.session.data?.role === 'vendor' && isAuthRequiredMethod) {
    const allowedVendorApiPattern = /^\/api\/vendor\/(.*)/;
    if (!allowedVendorApiPattern.test(req.originalUrl )) {
      return res.status(403).send('Forbidden');
    }
  }

  // If user is authenticated and authorized, call next() to pass control to the next middleware
  next();
};