import express, { Request, Response, NextFunction } from 'express';
import passport from '../middleware/passport';
// import { sessionStore } from '../../config';

const router = express.Router();

//구글 로그인 라우트
router.get('/login/federated/google', passport.authenticate('google'));

//로그인 성공하고 어디로 갈지 설정하는 라우터(여기서는 임시로 로그인 성공해도 home, 실패해도 home으로 명시함)
router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successReturnToOrRedirect: 'http://kdt-ai-10-team02.elicecoding.com',
    failureRedirect: '/',
  }),
);

//카카오 로그인 라우트
router.get('/login/federated/kakao', passport.authenticate('kakao'));

router.get(
  '/oauth2/redirect/kakao',
  passport.authenticate('kakao', {
    successReturnToOrRedirect: 'http://kdt-ai-10-team02.elicecoding.com',
    failureRedirect: '/',
  }),
);

//네이버 로그인 라우트
router.get('/login/federated/naver', passport.authenticate('naver'));

router.get(
  '/oauth2/redirect/naver',
  passport.authenticate('naver', {
    successReturnToOrRedirect: 'http://kdt-ai-10-team02.elicecoding.com',
    failureRedirect: '/',
  }),
);

router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res
          .clearCookie('connect.sid', {
            secure: false,
            httpOnly: true,
            path: '/',
          })
          .status(200)
          .send('Ok.');
      }
    });
  }
});

export default router;
