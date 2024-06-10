import express, { Request, Response, NextFunction } from 'express';
import passport from '../middleware/passport'

const router = express.Router();

router.get('/login/federated/google', passport.authenticate('google'));

//로그인 성공하고 어디로 갈지 설정하는 라우터(여기서는 임시로 로그인 성공해도 home, 실패해도 home으로 명시함)
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/'
}));



export default router;
