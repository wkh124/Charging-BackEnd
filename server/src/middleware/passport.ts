import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as KakaoStrategy, Profile as KakaoProfile } from 'passport-kakao';
import { Strategy as NaverStrategy, Profile as NaverProfile } from 'passport-naver-v2';
import {
  googleClientID,
  googleClientSecret,
  googleCallbackURL,
  kakaoClientID,
  kakaoClientSecret,
  kakaoCallbackURL,
  naverClientID,
  naverClientSecret,
  naverCallbackURL,
} from '../../config';
import { userDao } from '../DAO';
import { nanoid } from 'nanoid';
import crypto from 'crypto';
import AppError from '../../utils/appError';
import commonErrors from '../../utils/commonErrors';

// 한 달 이내인지 확인하는 헬퍼 함수
function isWithinLastMonth(date: Date): boolean {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return date > oneMonthAgo;
}

// 유저 로그인 또는 생성 처리하는 헬퍼 함수
async function handleUserLoginOrCreate(email: string, platform: string, profile: any, cb: (err: any, user?: any) => void) {
  try {
    const userRows = await userDao.findUser(email, platform);

    if (userRows.length > 0) {
      const user = userRows[0];

      if (user.deleted_at && isWithinLastMonth(new Date(user.deleted_at))) {
        await userDao.updateDeletedAtToNull(user.user_id);
        return cb(null, user);
      }

      if (user.deleted_at) {
        const uuid = crypto.randomUUID();
        const nickName = '익명' + nanoid();
        await userDao.createUser(uuid, email, platform, profile.displayName, nickName);

        const newUser = {
          user_id: uuid,
          email,
          displayName: profile.displayName,
        };
        return cb(null, newUser);
      }

      return cb(null, user);
    } else {
      const uuid = crypto.randomUUID();
      const nickName = '익명' + nanoid();
      await userDao.createUser(uuid, email, platform, profile.displayName, nickName);

      const newUser = {
        user_id: uuid,
        email,
        displayName: profile.displayName,
      };
      return cb(null, newUser);
    }
  } catch (err) {
    return cb(err);
  }
}

// 구글 passport
passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackURL,
      state: true,
      scope: ['profile', 'email'],
    },
    async (accessToken: string, refreshToken: string, profile: GoogleProfile, cb: (err: any, user?: any) => void) => {
      const email = profile.emails?.[0].value;
      if (!email) {
        return cb(new AppError(commonErrors.resourceNotFoundError, '이메일이 존재하지 않습니다.', 400));
      }
      handleUserLoginOrCreate(email, 'google', profile, cb);
    }
  )
);

// 카카오 passport
passport.use(
  new KakaoStrategy(
    {
      clientID: kakaoClientID,
      clientSecret: kakaoClientSecret,
      callbackURL: kakaoCallbackURL,
    },
    async (accessToken: string, refreshToken: string, profile: KakaoProfile, cb: (err: any, user?: any) => void) => {
      const email = profile._json.kakao_account.email;
      if (!email) {
        return cb(new AppError(commonErrors.resourceNotFoundError, '이메일이 존재하지 않습니다.', 400));
      }
      handleUserLoginOrCreate(email, 'kakao', profile, cb);
    }
  )
);

// 네이버 passport
passport.use(
  new NaverStrategy(
    {
      clientID: naverClientID,
      clientSecret: naverClientSecret,
      callbackURL: naverCallbackURL,
      state: true,
      scope: ['profile', 'email'],
    },
    async (accessToken: string, refreshToken: string, profile: NaverProfile, cb: (err: any, user?: any) => void) => {
      const email = profile.email;
      if (!email) {
        return cb(new AppError(commonErrors.resourceNotFoundError, '이메일이 존재하지 않습니다.', 400));
      }
      handleUserLoginOrCreate(email, 'naver', profile, cb);
    }
  )
);

passport.serializeUser((user: any, cb: (err: any, id?: any) => void) => {
  if (!user || !user.user_id) {
    return cb(new Error('User object or user_id is not defined'));
  }
  cb(null, { user_id: user.user_id });
});

passport.deserializeUser((user: any, cb: (err: any, user?: any) => void) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

export default passport;
