import * as passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { User } from '../model/user';
import { userRepository } from '../repo/repoFactory';

passport.serializeUser((user: User, done) => {
    done(null, user);
})

passport.deserializeUser((obj, done) => {
    done(null, obj);
})

passport.use(new GitHubStrategy(
    {
        clientID: process.env.OAUTH2_GITHUB_CLIENT_ID,
        clientSecret: process.env.OAUTH2_GITHUB_CLIENT_SECRET
        // callbackURL defined dynamically when calling passport.authenticate()
    },
    async (accessToken: string, refreshToken: string, profile: object, cb: any) => {
        const attributes = profile['_json']
        const email = attributes['email']
        let user = await userRepository.getByEmail(email)
        if (user == null) {
            // Create temp user and pass back to callback to check existence in database
            user = new User(null, email, attributes['name'], attributes['avatar_url'], profile['provider'], profile['id'], new Date())
        }
        return cb(null, user);
    }
))

passport.use(new GoogleStrategy(
    {
        clientID: process.env.OAUTH2_GOOGLE_CLIENT_ID,
        clientSecret: process.env.OAUTH2_GOOGLE_CLIENT_SECRET
        // callbackURL defined dynamically when calling passport.authenticate()
    },
    async (accessToken: string, refreshToken: string, profile: object, cb: any) => {
        const attributes = profile['_json']
        const email = attributes['email']
        let user = await userRepository.getByEmail(email)
        // Create temp user and pass back to callback to check existence in database
        if (user == null) {
            user = new User(null, email, attributes['name'], attributes['picture'], profile['provider'], profile['id'], new Date())
        }
        return cb(null, user);
    }
))
