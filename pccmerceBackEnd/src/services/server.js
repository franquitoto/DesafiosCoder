import express from "express"; //Importamos la libreria para levantar un serivor local;}
import MongoStore from "connect-mongo";
import passport from "passport"; // Libreria para para poder manejar las sesiones del usuario complementadas con otras
import session from "express-session"; // Libreria para para poder manejar las sesiones del usuario complementadas con otras
import Config from "../config"; // Importamos las variables de entorno;
import Logger from './logger';
require('../passport/local-auth');


import mainRouter from '../routes'



const app = express();
const ttlSeconds = 1800;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_URL,
    crypto: {
      secret: 'zzzzzzecreto',
    },
  }),
  secret: 'zzzzzzecreto',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

app.use(session(StoreOptions));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', mainRouter);

app.use(function (err, req, res, next) {
  const status = err.statusCode || 500;
  const msg = err.message || 'Internal Server Error';
  const stack = err.stack;
  Logger.error(err);
  res.status(status).send({ msg, stack });
})

export default app;
