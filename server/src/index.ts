import dotenv from 'dotenv';
dotenv.config();

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import passport from 'passport';
import logger from 'morgan';
import MySQLStoreFactory from 'express-mysql-session';

const MySQLStore = MySQLStoreFactory(require('express-session'));
const session = require('express-session');


import indexRouter from './routes/index';
import  authRouter from './routes/auth';

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST || 'charging-db.ctq2gqy0svm5.us-east-1.rds.amazonaws.com',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'charging',
  database: process.env.DB_NAME || 'charging_db'
});

app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: sessionStore
}));

app.use(csrf());

app.use(passport.authenticate('session'));

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/', indexRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

app.listen(3000, () => {
  console.log(`
    #############################################
        🛡️ Server listening on port: 3000 🛡️
    #############################################    
    `);
});
