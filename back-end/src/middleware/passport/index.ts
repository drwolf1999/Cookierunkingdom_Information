import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
// Load User model
import User from "../../models/user";

const LocalStrategy = passportLocal.Strategy;

passport.use(
    new LocalStrategy({usernameField: 'username'}, (username, password, done) => {
        // Match user
        User.findOne({
            username
        }).then((user: any) => {
            if (!user) {
                return done(null, false, {message: 'That username is not registered'});
            }
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Password incorrect'});
                }
            });
        });
    })
);

passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: any, user: any) => {
        done(err, user);
    });
});