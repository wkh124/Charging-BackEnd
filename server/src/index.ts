import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import session from 'express-session';
import crypto from 'crypto';
import createError from 'http-errors';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

import { port } from '../config';
import { sessionStore } from '../config';
import { authRouter, stateRouter } from './routes';

const app = express();

// 부가 기능 미들웨어 연결
app.use(logger('dev')); // 개발 환경에서 로그 기록
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // URL-encoded 형식으로 전송된 요청 본문을 해석하고 req.body 객체에 파싱된 데이터를 저장, extended: false => 중첩 객체가 아닌 단일 객체로 파싱
app.use(cookieParser()); // 요청에 포함된 쿠키를 파싱하여 req.cookies 객체에 저장
app.use(express.static(path.join(__dirname, '../public'))); // 정적 파일을 제공할 디렉토리 경로를 지정, 해당 경로에서 정적 파일을 찾고 요청에 따라 클라이언트 전달


// session 처리
const secretKey = crypto.randomBytes(32).toString('hex'); // secrete 값은 보안을 강화하기 위해서 랜덤하고 예측하기 어려운 값이어야 함
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  }),
);

// passport 연결
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장
// passport.session()이 실행되면, 세션쿠키 정보를 바탕으로 해서 passport/index.ts의 deserializeUser()가 실행하게 한다.

// 보안 강화 미들웨어 연결
app.use(csrf()); // Cross-Site Request Forgery(CSRF) 공격을 방어, 각 요청에 대해 CSRF 토큰이 생성되고 이를 사용하여 요청의 유효성을 검사, 요청 보호를 위함
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // CSRF 토큰을 req의 csrfToken() 메서드를 통해 생성, 이를 res의 locals 속성에 저장, 템플릿 엔진에서 해당 토큰을 사용하여 CSRF 공격 방어 가능
  next();
});
// app.use(passport.authenticate('session')); // 세션을 관리하고 사용자의 인증 상태를 유지합니다. 이 경우에는 세션을 사용하여 사용자가 로그인되어 있는지 확인하고, 로그인된 사용자에 대한 정보를 요청 객체(req)에 저장

// 라우터 연결
app.use('/', stateRouter);
app.use('/', authRouter);

// 오류 처리 미들웨어
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

app.use(
  (
    err: createError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    console.error(err);

    // res.locals.message = err.message; // view 엔진(ejs, pug) 사용 시

    const statusCode: number = err.statusCode ?? 500;
    let message: string = err.message;
    if (statusCode === 500) {
      message = 'Internal Server Error';
    }
    return res.status(statusCode).json({
      data: null,
      error: message,
    });

    // view 렌더 시, 사용
    // res.status(statusCode).render('../public', { message }); // 'error'는 public 파일(view 파일)의 이름
  },
);

// 서버 실행
app.listen(port, () => {
  console.log(`
    #############################################
        🛡️ Server listening on port: ${port} 🛡️
    #############################################    
    `);
});

