import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.send('home');
  }
  next();
}, (req: Request, res: Response, next: NextFunction) => {
  res.locals.filter = null;
  res.send('home');
});

export default router;
