// config/index.ts

import dotenv from 'dotenv';
import { Pool } from 'pg';
import commonErrors from '../utils/commonErrors';
import AppError from '../utils/appError';

// NODE_ENV 값을 이용해서 production(배포) 모드, development(개발) 두 가지로 나누어 실행하게 됨
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
console.log(`어플리케이션 서버를 다음 환경으로 시작합니다: ${process.env.NODE_ENV}`);

const envFound = dotenv.config();
if (envFound.error) {
  throw new AppError(commonErrors.configError, "Couldn't find .env file");
}

// 환경 변수 로깅 (디버깅용)
console.log('DB_CONFIG_HOST:', process.env.DB_CONFIG_HOST);
console.log('DB_CONFIG_USER:', process.env.DB_CONFIG_USER);
console.log('DB_CONFIG_PASSWORD:', typeof process.env.DB_CONFIG_PASSWORD);
console.log('DB_CONFIG_DATABASE:', process.env.DB_CONFIG_DATABASE);
console.log('DB_CONFIG_PORT:', process.env.DB_CONFIG_PORT);

// DB 연결을 위한 URI or string값 체크
if (!process.env.DB_CONFIG_HOST) {
  throw new AppError(
    commonErrors.configError,
    '어플리케이션을 시작하려면 DB 환경변수가 필요합니다.',
  );
}

// DB 접속 설정 객체 생성을 위한 Pool, Connection parameters로 연결 (postgreSQL)
const db_connection: Pool = new Pool({
  host: process.env.DB_CONFIG_HOST,
  user: process.env.DB_CONFIG_USER,
  password: String(process.env.DB_CONFIG_PASSWORD), // ensure the password is a string
  database: process.env.DB_CONFIG_DATABASE,
  port: parseInt(process.env.DB_CONFIG_PORT ?? '5432', 10),
  ssl: {
    rejectUnauthorized: false,
  },
  options: '-c search_path=public', // Search path 설정
});

// DB 연결
const connectToSupabase = async () => {
  try {
    await db_connection.connect();
    console.log('Supabase PostgreSQL database 연결 성공');
  } catch (err) {
    console.error('Supabase PostgreSQL database 연결 실패', err);
  }
}
connectToSupabase();

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

const url='http://localhost:3000';

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
  url
};
