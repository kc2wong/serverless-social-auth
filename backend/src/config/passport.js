const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../model/user');
const { userRepository } = require('../repo/repoFactory');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy(
    {
        clientID: process.env.OAUTH2_GITHUB_CLIENT_ID,
        clientSecret: process.env.OAUTH2_GITHUB_CLIENT_SECRET
        // callbackURL defined dynamically when calling passport.authenticate()
    },
    async (accessToken, refreshToken, profile, cb) => {
        const attributes = profile._json
        const email = attributes.email
        let user = await userRepository.getByEmail(email)
        if (user == null) {
            // Create temp user and pass back to callback to check existence in database
            user = new User(null, email, attributes.name, attributes.avatar_url, profile.provider, profile.id)
        }
        return cb(null, user);
    }
));

passport.use(new GoogleStrategy(
    {
        clientID: process.env.OAUTH2_GOOGLE_CLIENT_ID,
        clientSecret: process.env.OAUTH2_GOOGLE_CLIENT_SECRET,
        // callbackURL defined dynamically when calling passport.authenticate()
    },
    async (accessToken, refreshToken, profile, cb) => {
        const attributes = profile._json
        const email = attributes.email
        let user = await userRepository.getByEmail(email)
        // Create temp user and pass back to callback to check existence in database
        if (user == null) {
            user = new User(null, email, attributes.name, attributes.picture, profile.provider, profile.id)
        }
        return cb(null, user);
    }
));
