import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local';
import { Logger } from "winston";
import User from '../models/user';

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  };


passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser( async (id, done) =>{
    const user = await User.findById(id);
});
const singup = async (req, username, password, done) => {
    Logger.info('signup');
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    done(null, user);
}

export const signupFunc = new LocalStrategy(strategyOptions, singup);

// passport.use('local-signup', new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
//     passReqToCallback: true
// }, async (req, username, password, done) =>{
//     const user = new User();
//     user.username = username;
//     user.password = password;
//     await user.save();
//     done(null, user);
// }));