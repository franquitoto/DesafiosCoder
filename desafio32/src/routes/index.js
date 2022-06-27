import { Router } from "express";
import util from 'util';
import passport from "passport";
import path from "path";
import { logger } from "../services/logger";
import { getAll } from "../controllers/productos";


const router = Router();


let usuarios = [
  { user: 'Franco', pass: 'arias' },
  { user: 'Leandro', pass: 'bordon' }
]
const passportOptions = {badRequestMessage: 'Falta username / contraseña'};
const isLoggedIn = (req, res, next) => {
  logger.trace('Is Authenticated')
  logger.trace(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.render({ msg: 'aca no pasas' });

  next();
}
router.get('/', (req, res) => {
  if(req.session.nombre){
    const userSesion = req.session.nombre
    res.render('index',{userSesion} );
  }else{
    res.render('login')
  }
  
})
/* --------- index ---------- */
router.get('/index', (req, res) => {
  const indexPath = path.resolve(__dirname, '../../views/index');
  res.render('index');
});
/* --------- login ---------- */
router.get('/login', (req, res) => {
  const loginPath = path.resolve(__dirname, '../../views/login');
  res.render('login');
});
/* --------- signup ---------- */
router.get('/signup', (req, res) => {
  const signupPath = path.resolve(__dirname, '../../views/signup');
  res.render('signup');
});
router.post(
  '/login',
  passport.authenticate('login', {failureRedirect:'/signup'}),
  (req, res) => {
    // res.json({ msg: 'Welcome!', user: req.user });

    const userSesion = req.user.username
    res.render('index',{userSesion} );
  },
);
// router.post('/login', (req, res) => {
//   let { user, pass } = req.body;
//   let credencialesOk = usuarios.filter(
//     (usuario) => usuario.user == user && usuario.pass == pass
//   ).length;
//   if (credencialesOk) {
//     req.session.nombre = user;
//     req.session.contador = 0;
//     const userSesion = req.session.nombre
//     console.log(userSesion)
//     console.log("Ingreso exitoso");
//     res.render('index',{userSesion} );
//   } else {
//     console.log("No estas autorizado");
//   }
// })
router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', passportOptions, (err, user, info) => {
    console.log('Info SIGNUP');
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json(info);

    // res.json({ msg: 'signup OK' });
    res.render('login');
  })(req, res, next);
});



router.get('/logout', (req, res) => {
  
  req.session.destroy((err) => {
    res.redirect('/');
  });
  
});
router.get('/info', async (req, res) =>{
  const productos = await getAll();
  res.json({
    msj: productos
  })
})


export default router;