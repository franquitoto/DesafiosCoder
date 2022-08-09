import Handler from 'express-async-handler';
import { Router } from 'express';
import logger from '../services/logger';
import passport from 'passport';
//import {UserController } from '../controllers';

const router = new Router();

router.get('/', (req, res) => {
    res.json({
        msj: 'Hola'
    });
});

router.get('/signup', (req, res, next) =>{
    res.send('signup');
})
router.post('/signup', passport.authenticate('local-signup',{
    successMessage: 'ok',
    failureMessage: 'no ok',
    passReqToCallback: true
}));

export default router;