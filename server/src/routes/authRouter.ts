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
    successReturnToOrRedirect: 'http://localhost:5173/',
    failureRedirect: '/',
  }),
);

//카카오 로그인 라우트
router.get('/login/federated/kakao', passport.authenticate('kakao'));

router.get(
  '/oauth2/redirect/kakao',
  passport.authenticate('kakao', {
    successReturnToOrRedirect: 'http://localhost:5173/',
    failureRedirect: '/',
  }),
);

//네이버 로그인 라우트
router.get('/login/federated/naver', passport.authenticate('naver'));

router.get(
  '/oauth2/redirect/naver',
  passport.authenticate('naver', {
    successReturnToOrRedirect: 'http://localhost:5173/',
    failureRedirect: '/',
  }),
);

// router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
//   req.logout({}, (err: any) => {
//     if (err) {
//       return next(err);
//     }
//     sessionStore.destroy(req.sessionID, (err: any) => {
//       if (err) {
//         return next(err);
//       }
//       req.session.destroy((err) => {
//         if (err) {
//           return next(err);
//         }
//         res.redirect('/'); // 로그아웃 후 리다이렉트할 경로
//       });
//     });
//   });
// });

export default router;
