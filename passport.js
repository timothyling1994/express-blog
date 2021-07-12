const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('./models/user');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
        console.log(email, password);
//this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        
        //return User.findOne({email, password}).then(user => {
        return User.findOne({email}).lean(true).then(user => {
            if (!user) {
                return cb(null, false, {message: 'Incorrect email or password.'});
            }

            bcrypt.compare(password,user.password,(err,res)=>{
                console.log(password);
                console.log(user.password);
                if(res){
                    console.log("password MATCHED");
                    return cb(null, user, {message: 'Logged In Successfully'});
                }
                else
                {
                    console.log("password NO MATCH");
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }
            })
        }).catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));