import passport from 'passport';
import {Router} from 'express';
import {UserModel} from '../models/user';


const router = Router();

const passportOptions = {badRequestMessage: 'Falta username / contraseña'};
router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
      console.log('Info SIGNUP');
      console.log(err, user, info);
      if (err) {
        return next(err);
      }
      if (!user) return res.status(401).json(info);
  
      res.json({ msg: 'signup OK' });
    })(req, res, next);
  });

  router.post(
    '/login',
    passport.authenticate('login', passportOptions),
    (req, res) => {
      res.json({ msg: 'Welcome!', user: req.user });
    },
  );
  


router.get('/', async (req, res) =>{
    const users = await UserModel.find();
    res.json({
        msj: "Hola",
        user: users
    });
});

export default router;
