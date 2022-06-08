import passport from 'passport';
import { Strategy as LocalStrategy, Strategy } from 'passport-local';
import { UserModel } from '../models/user';

const strategyOptions = {
    usernameField : 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true,
};

const login = async (req, username, password, done) =>{
    console.log("LOGIN!!!");
    const user = await UserModel.findOne({username, password});

    if(!user){
        return done(null, false, {mensaje: 'usuario no econtrado'});
    }else{
        console.log("Encontre un usuario");
        return done(null, user);
    }
}
const signup = async (req, username, password, done) =>{
    console.log("signup!!");
    try{
        const newUser = await UserModel.create({username, password});
        return done(null, newUser)
    }catch(err){
        console.log("Hubo un error");
        console.log(err);
        return done(null, false, {mensaje: 'Error inesperado'});
    }
}
export const logingFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);

/**
 * Express-session crea un objeto session en la request
 * passport agrega a req.session un objeto llamado passport para guardar la info del usuario
 * Cuando llamamos a done en login o en signup y pasamos el usuario lo siguiente que ocurre es que se ejecuta passport.serializeUser
 * Esta funcion agarra el usuario que recibio y lo guarda en req.session.passport 
 * En este caso estamos creando una key llamado user con la info del usuario dentro de req.session.passport
 */
passport.serializeUser((user, done) =>{
    console.log("Se esta ejecutando serializer");
    done(null, user);
});

/**
 * DeserializeUser Permite tomar la info que mandamos con el serializeUser para hacer algun extra de busqueda de informacion
 */
passport.deserializeUser((user, done) =>{
    console.log("Se esta ejecutando deserializer");
    done(null, user);
});
