import express from "express";
import mainRouter from '../routes/index';
import http from 'http';
import path from "path";
import session from 'express-session';
import passport from 'passport';
import { loginFunc, signUpFunc } from './auth';
import MongoStore from "connect-mongo";
import Config from './config/index';
import compression from 'compression';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression());
const ttlSeconds = 180;
const storeOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_URL ,
    crypto: {
      secret: 'squirrel',
    },
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};
app.use(session(storeOptions));
app.use('/', mainRouter);
const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));
app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../../views');
app.set('views', viewsPath);
//Indicamos que vamos a usar passport en todas nuestras rutas
app.use(passport.initialize());

//Permitimos que passport pueda manipular las sessiones de nuestra app
app.use(passport.session());

// Cuando un usuario se autentique correctamente, passport va a devolver en la session la info del usuario
passport.use('login', loginFunc);

//signUpFunc va a ser una funcion que vamos a crear y va a tener la logica de registro de nuevos usuarios
passport.use('signup', signUpFunc);



const myServer = http.Server(app);
export default myServer;



