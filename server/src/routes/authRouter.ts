import express, { Request, Response, NextFunction } from 'express';
import passport from '../middleware/passport'

const router = express.Router();

//구글 로그인 라우트
router.get('/login/federated/google', passport.authenticate('google'));

//로그인 성공하고 어디로 갈지 설정하는 라우터(여기서는 임시로 로그인 성공해도 home, 실패해도 home으로 명시함)
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/'
}));


//카카오 로그인 라우트
router.get('/login/federated/kakao', passport.authenticate('kakao'));

router.get('/oauth2/redirect/kakao', passport.authenticate('kakao', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/'
}));


export default router;
