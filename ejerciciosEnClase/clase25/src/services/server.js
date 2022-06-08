import express from 'express';
import mainRouter from '../routes';
import session from 'express-session';
import passport from 'passport';
import {logingFunc, signUpFunc} from './auth';



const app = express();

app.use(express.json());

// Inicializar express-session
app.use(
    session({
        secret:'secret',
        resave: false,
        saveUninitialized: true,
    }),
);

// Indicamos que vamos a usar passport en todas nuestras rutas
app.use(passport.initialize());

// Permitimos que passport pueda manipular las sesiones de nuestra app
app.use(passport.session());

// cuando el usuario se autentique correctamente, passport va a devolver en la sesion la info del usuario
passport.use('login', logingFunc);

// SingUpFunc va a ser una funcion que vamos a crear y va a tener logica de registro de nuevos usuarios
passport.use('signup', signUpFunc);
 



app.use('/api', mainRouter);

export default app;