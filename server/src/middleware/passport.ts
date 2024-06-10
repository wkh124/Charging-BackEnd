import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import {
    googleClientID,
    googleClientSecret,
    googleCallbackURL,
    db_connection,
  } from '../../config';
  
import crypto from 'crypto';

interface User {
    user_id: string;
    platform_type: string;
    email: string;
    displayName: string;
  }

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: googleCallbackURL,
  state: true,
  scope: ['profile', 'email'],
}, async function verify(accessToken: string, refreshToken: string, profile: Profile, cb: (err: any, user?: any) => void) {
  try {
    console.log(profile.emails?.[0].value);
    const [rows] = await db_connection.query('SELECT * FROM users WHERE platform_type = ? AND email = ?', [
      'google',
      profile.emails?.[0].value,
    ]);

    const userRows = rows as User[];

    if(userRows.length> 0) {
      console.log(rows);
      return cb(null, rows);
    } else {
      const uuid = crypto.randomUUID();
      await db_connection.query('INSERT INTO users ( user_id, platform_type, email, displayName) VALUES (?, ?, ?, ?)', [
        uuid,
        'google',
        profile.emails?.[0].value,
        profile.displayName,
      ]);

      const user = {
        email: profile.emails?.[0].value,
        name: profile.displayName
      };
      return cb(null, user);
    }
  } catch (err) {
    return cb(err);
  }
}));

passport.serializeUser(function(user: any, cb: (err: any, id?: any) => void) {
  process.nextTick(function() {
    cb(null, { email: user.email, name: user.name });
  });
});

passport.deserializeUser(function(user: any, cb: (err: any, user?: any) => void) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

  
export default passport;