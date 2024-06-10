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

import crypto from 'crypto';

interface User {
  user_id: string;
  platform_type: string;
  email: string;
  displayName: string;
}
//Google passport
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
      cb: (err: any, user?: any) => void,
    ) {
      try {
        console.log(profile.emails?.[0].value);
        const [rows] = await db_connection.query(
          'SELECT * FROM users WHERE platform_type = ? AND email = ?',
          ['google', profile.emails?.[0].value],
        );

        const userRows = rows as User[];

        if (userRows.length > 0) {
          console.log(rows);
          return cb(null, rows);
        } else {
          const uuid = crypto.randomUUID();
          await db_connection.query(
            'INSERT INTO users ( user_id, platform_type, email, displayName) VALUES (?, ?, ?, ?)',
            [uuid, 'google', profile.emails?.[0].value, profile.displayName],
          );

          const user = {
            email: profile.emails?.[0].value,
            name: profile.displayName,
          };
          return cb(null, user);
        }
      } catch (err) {
        return cb(err);
      }
    },
  ),
);

//Kakao passport
passport.use(
  new KakaoStrategy(
    {
      clientID: kakaoClientID,
      clientSecret: kakaoClientSecret,
      callbackURL: kakaoCallbackURL,
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: KakaoProfile,
      done: (err: any, user?: any) => void,
    ) {
      try {
        const [rows] = await db_connection.query(
          'SELECT * FROM users WHERE platform_type = ? AND email = ?',
          ['kakao', profile._json.kakao_account.email],
        );

        const userRows = rows as User[];

        if (userRows.length > 0) {
          console.log(rows);
          return done(null, rows);
        } else {
          const uuid = crypto.randomUUID();
          await db_connection.query(
            'INSERT INTO users (user_id, platform_type, email, displayName) VALUES (?, ?, ?, ?)',
            [
              uuid,
              'kakao',
              profile._json.kakao_account.email,
              profile.displayName,
            ],
          );

          const user = {
            email: profile._json.kakao_account.email,
            name: profile.displayName,
          };
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    },
  ),
);

//Naver passport
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
      cb: (err: any, user?: any) => void,
    ) {
      try {
        console.log(profile.email);
        const [rows] = await db_connection.query(
          'SELECT * FROM users WHERE platform_type = ? AND email = ?',
          ['naver', profile.email],
        );

        const userRows = rows as User[];

        if (userRows.length > 0) {
          console.log(rows);
          return cb(null, rows);
        } else {
          const uuid = crypto.randomUUID();
          await db_connection.query(
            'INSERT INTO users ( user_id, platform_type, email, displayName) VALUES (?, ?, ?, ?)',
            [uuid, 'naver', profile.email, profile.name],
          );

          const user = {
            email: profile.email,
            name: profile.name,
          };
          return cb(null, user);
        }
      } catch (err) {
        return cb(err);
      }
    },
  ),
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
