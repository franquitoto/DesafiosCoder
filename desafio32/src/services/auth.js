import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {UserModel} from '../models/user';
import { logger } from './logger';

const strategyOptions = {
  usernameField: 'usuario',
  passwordField: 'contrasena',
  passReqToCallback: true,
};

const login = async (req, username, password, done) => {
  logger.info('LOGIN!!');
  const user = await UserModel.findOne({ username});

  if (!user || !user.isValidPassword(password)) return done(null, false, { mensaje: 'Usuario no encontrado' });

  logger.trace('ENCONTRE UN USUARIO');
  return done(null, user);
};

const signup = async (req, username, password, done) => {
  logger.trace('SIGNUP!!');
  try {
    const newUser = await UserModel.create({ username, password });
    return done(null, newUser);
  } catch (err) {
    logger.error(`Hubo un error ${err}`)
    return done(null, false, { mensaje: 'Error Inesperado', err });
  }
};

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);


/**
 * Express-session crea un objeto session en la request
 * passport agrega a req.session un objeto llamado passport para guardar la info del usuario
 * Cuando llamamos a done en login o en signup y pasamos el usuario lo siguiente que ocurre es que se ejecuta passport.serializeUser
 * Esta funcion agarra el usuario que recibio y lo guarda en req.session.passport 
 * En este caso estamos creando una key llamado user con la info del usuario dentro de req.session.passport
 */
 passport.serializeUser((user, done) => {
  logger.trace('Se Ejecuta el serializeUser');
  done(null, user._id);
});

/**
 * DeserializeUser Permite tomar la info que mandamos con el serializeUser para hacer algun extra de busqueda de informacion
 */
 passport.deserializeUser((userId, done) => {
  logger.trace('Se Ejecuta el desserializeUser');
  UserModel.findById(userId).then((user) => {
    return done(null, user);
  })
});