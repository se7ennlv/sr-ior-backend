const config = require('../config/index');
const models = require("../models/index");
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
//opts.issuer = 'esr.savanresorts.com';
//opts.audience = 'savantechn.com';
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const userId = jwt_payload.id;
        const user = await models.AccountModel.findOne({
            attributes: { exclude: ['-password'] },
            where: { id: userId }
        });

        if (!user) {
            return done(new Error('No data found.'), null);
        }

        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

module.exports.isLogin = passport.authenticate('jwt', { session: false });