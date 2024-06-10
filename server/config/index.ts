import dotenv from 'dotenv';
import mysql, { Pool } from 'mysql2/promise';
import MySQLStoreFactory from 'express-mysql-session';
const MySQLStore = MySQLStoreFactory(require('express-session'));
import commonErrors from '../utils/commonErrors';
import AppError from '../utils/appError';

// NODE_ENV 값을 이용해서 production(배포) 모드, development(개발) 두 가지로 나누어 실행하게 됨
// 개발모드: 파일 캐싱 방지, 디버그를 위한 상세한 에러 메세지 보이기 등의 개발에 도움을 줄 수 있는 환경으로 설정
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
console.log(
  `어플리케이션 서버를 다음 환경으로 시작합니다: ${process.env.NODE_ENV}`,
);

const envFound = dotenv.config();
if (envFound.error) {
  throw new AppError(commonErrors.configError, "Couldn't find .env file");
}

// DB 연결을 위한 URI값 체크
if (!process.env.DB_CONFIG_HOST) {
  throw new AppError(
    commonErrors.configError,
    '어플리케이션을 시작하려면 DB 환경변수가 필요합니다.',
  );
}

// DB 접속 정보 설정 및 접속
const db_connection: Pool = mysql.createPool({
  host: process.env.DB_CONFIG_HOST,
  user: process.env.DB_CONFIG_USER,
  password: process.env.DB_CONFIG_PASSWORD,
  database: process.env.DB_CONFIG_DATABASE,
  port: parseInt(process.env.DB_CONFIG_PORT ?? '3306', 10),
});

// DB에 세션을 저장하기 위한 세션 스토어 생성
const sessionStore = new MySQLStore({
  host: process.env.DB_CONFIG_HOST,
  port: parseInt(process.env.DB_CONFIG_PORT ?? '3306', 10),
  user: process.env.DB_CONFIG_USER,
  password: process.env.DB_CONFIG_PASSWORD,
  database: process.env.DB_CONFIG_DATABASE,
});

const applicationName = process.env.APPLICATION_NAME ?? 'noname app';
const port = parseInt(process.env.PORT ?? '3000', 10);

const naverClientID = process.env.NAVER_ID ?? '';
const naverClientSecret = process.env.NAVER_SECRET ?? '';
const naverCallbackURL = process.env.NAVER_CALL_BACK_URL ?? '';

const googleClientID = process.env.GOOGLE_ID ?? '';
const googleClientSecret = process.env.GOOGLE_SECRET ?? '';
const googleCallbackURL = process.env.GOOGLE_CALL_BACK_URL ?? '';

const kakaoClientID = process.env.KAKAO_ID ?? '';
const kakaoClientSecret = process.env.KAKAO_SECRET ?? '';
const kakaoCallbackURL = process.env.KAKAO_CALL_BACK_URL ?? '';


export {
  applicationName,
  port,
  naverClientID,
  naverClientSecret,
  naverCallbackURL,
  googleClientID,
  googleClientSecret,
  googleCallbackURL,
  kakaoClientID,
  kakaoClientSecret,
  kakaoCallbackURL,
  db_connection,
  sessionStore,
};
