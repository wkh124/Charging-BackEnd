import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import session from 'express-session';
const pgSession = require('connect-pg-simple')(session);

import crypto from 'crypto';
import createError from 'http-errors';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { port, db_connection } from '../config';
import { carImgRouter,authRouter, stateRouter, profileRouter, carReviewRouter, carRouter, mapCommentRouter, chargingMapRouter, profilePicRouter, commentLikesRouter, userReviewRouter} from './routes';

const app = express();
let corsOptions = {
  origin: "http://localhost:5173", // 출처 허용 옵션
  credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

// 부가 기능 미들웨어 연결
app.use(cors(corsOptions));
// 부가 기능 미들웨어 연결
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// PostgreSQL에 세션 저장 설정
const secretKey = crypto.randomBytes(32).toString('hex');
app.use(
  session({
    store: new pgSession({
      pool: db_connection, // pool 객체를 직접 전달
      tableName: 'sessions',
      schemaName: 'public',
      createTableIfMissing: true,
    }),
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
  }),
);


// passport 연결
app.use(passport.initialize());
app.use(passport.session());

// 디버깅을 위한 세션 로깅 미들웨어
app.use((req, res, next) => {
  console.log('Session:', req.session);
  next();
});

app.use('/uploads', express.static('./uploads'))

// 라우터 연결
app.use('/', stateRouter);
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', carReviewRouter);
app.use('/', carRouter);
app.use('/', mapCommentRouter);
app.use('/', chargingMapRouter);
app.use('/', profilePicRouter);
app.use('/', commentLikesRouter);
app.use('/', userReviewRouter);
app.use('/', carImgRouter);




// 오류 처리 미들웨어
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

app.use((err: createError.HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const statusCode: number = err.statusCode ?? 500;
  let message: string = err.message;
  if (statusCode === 500) {
    message = '내부 서버 오류';
  }
  return res.status(statusCode).json({
    data: null,
    error: message,
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`
    #############################################
        🛡️ Server listening on port: ${port} 🛡️
    #############################################    
    `);
});
