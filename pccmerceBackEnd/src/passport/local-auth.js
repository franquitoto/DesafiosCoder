import passport from "passport";
import {LocalStrategy} from 'passport-local';
import User from '../models/user';

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser( async (id, done) =>{
    const user = await User.findById(id);
});
passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    done(null, user);
}));