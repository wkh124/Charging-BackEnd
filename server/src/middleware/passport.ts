import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import {
  Strategy as KakaoStrategy,
  Profile as KakaoProfile,
} from 'passport-kakao';
import {
  Strategy as NaverStrategy,
  Profile as NaverProfile,
} from 'passport-naver-v2';
import {
  googleClientID,
  googleClientSecret,
  googleCallbackURL,
  db_connection,
  kakaoClientID,
  kakaoClientSecret,
  kakaoCallbackURL,
  naverClientID,
  naverClientSecret,
  naverCallbackURL,
} from '../../config';
import { userDao } from '../DAO';
import { nanoid } from "nanoid"; 
import crypto from 'crypto';
import AppError from '../../utils/appError';
import commonErrors from '../../utils/commonErrors';

//구글 passport
passport.use(
  new GoogleStrategy(
    {
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: googleCallbackURL,
  state: true,
  scope: ['profile', 'email'],
    }, 
    async function verify(
      accessToken: string, 
      refreshToken: string, 
      profile: Profile, 
      cb: (err: any, user?: any) => void
    ) {
      try {
        const email = profile.emails?.[0].value;

        if (!email) {
          return cb(new AppError(commonErrors.resourceNotFoundError,'이메일이 존재하지 않습니다.', 400));
        }

        const userRows = await userDao.findUserByEmailAndPlatform(email, 'google');

        if (userRows.length > 0) {
          return cb(null, userRows[0]);
        } else {
          let uuid = crypto.randomUUID();
          let nickName= "익명"+ nanoid();
          await userDao.createUser(uuid, email, 'google', profile.displayName, nickName);

          const user = {
                        email,
                        displayName: profile.displayName,
          };
          return cb(null, user);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

//카카오 passport
passport.use(
  new KakaoStrategy(
    {
      clientID: kakaoClientID,
      clientSecret: kakaoClientSecret,
      callbackURL: kakaoCallbackURL,
    }, 
    async function verify(
      accessToken: string,
      refreshToken: string, 
      profile: KakaoProfile, 
      cb: (err: any, user?: any) => void
    ) {
      try {
          const email = profile._json.kakao_account.email;

          if (!email) {
            return cb(new AppError(commonErrors.resourceNotFoundError,'이메일이 존재하지 않습니다.', 400));
          }

          const userRows = await userDao.findUserByEmailAndPlatform(email, 'kakao');

          if (userRows.length > 0) {
            return cb(null, userRows[0]);
          } else {
            let uuid = crypto.randomUUID();
            let nickName= "익명"+ nanoid()
            await userDao.createUser(uuid, profile._json.kakao_account.email, 'kakao', profile.displayName, nickName);

            const user = {
            email:profile._json.kakao_account.email ,
            displayName: profile.displayName,
          };
          return cb(null, user);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

//네이버 passport
passport.use(
  new NaverStrategy(
    {
      clientID: naverClientID,
      clientSecret: naverClientSecret,
      callbackURL: naverCallbackURL,
      state: true,
      scope: ['profile', 'email'],
    }, 
    async function verify(
      accessToken: string, 
      refreshToken: string, 
      profile: NaverProfile, 
      cb: (err: any, user?: any) => void
    ) {
      try {
        const email = profile.email;
        if (!email) {
          return cb(new AppError(commonErrors.resourceNotFoundError,'이메일이 존재하지 않습니다.', 400));
          }

          const userRows = await userDao.findUserByEmailAndPlatform(email, 'naver');

        if (userRows.length > 0) {
          return cb(null, userRows[0]);
        } else {
          let uuid = crypto.randomUUID();
          let nickName= "익명"+ nanoid();
          await userDao.createUser(uuid, email, 'naver', profile.name as string, nickName);

          const user = {
            email,
            displayName: profile.name,
          };
          return cb(null, user);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function (user: any, cb: (err: any, id?: any) => void) {
  process.nextTick(function () {
    cb(null, { email: user.email, name: user.name });
  });
});

passport.deserializeUser(function (
  user: any,
  cb: (err: any, user?: any) => void,
) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

export default passport;
