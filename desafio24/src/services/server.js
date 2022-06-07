import express from "express";
import mainRouter from '../routes/index';
import http from 'http';
import path from "path";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from "connect-mongo";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const ttlSeconds = 180;
const storeOptions = {
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://franco99:OrWu5DCtlXaoblJq@cluster0.tvjwd.mongodb.net/eccomerce?retryWrites=true&w=majority',
    crypto: {
      secret: 'squirrel',
    },
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 100,
  },
};
app.use(session(storeOptions));
app.use('/', mainRouter);
const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));
app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../../views');
app.set('views', viewsPath);



const myServer = http.Server(app);
export default myServer;



