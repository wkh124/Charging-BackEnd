import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.send('login failed');
  }
  next();
}, (req: Request, res: Response, next: NextFunction) => {
  res.locals.filter = null;
  return res.send('login succes');
});

export default router;
