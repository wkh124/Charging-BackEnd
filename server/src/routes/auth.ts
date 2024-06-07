import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import db from '../db';
import crypto from 'crypto';

interface User {
    user_id: string;
    platform_type: string;
    email: string;
    displayName: string;
  }

passport.use(new GoogleStrategy({
  clientID: "1007308287440-91bjr0t32ia3jelgv17mk4miuttv9a65.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: '/oauth2/redirect/google',
  state: true,
  scope: ['profile', 'email'],
}, async function verify(accessToken: string, refreshToken: string, profile: Profile, cb: (err: any, user?: any) => void) {
  try {
    console.log(profile.emails?.[0].value);
    const [rows] = await db.query('SELECT * FROM users WHERE platform_type = ? AND email = ?', [
      'google',
      profile.emails?.[0].value,
    ]);

    const userRows = rows as User[];

    if(userRows.length> 0) {
      console.log(rows);
      return cb(null, rows);
    } else {
      const uuid = crypto.randomUUID();
      await db.query('INSERT INTO users ( user_id, platform_type, email, displayName) VALUES (?, ?, ?, ?)', [
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

const router = express.Router();

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/'
}));

router.post('/logout', function(req: Request, res: Response, next: NextFunction) {
  req.logout(function(err: any) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default router;
