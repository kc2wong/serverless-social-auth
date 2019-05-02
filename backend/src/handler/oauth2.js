const passport = require('passport');
const _ = require('lodash')
const router = require('express').Router();
const { userRepository } = require('../repo/repoFactory');

async function handleCallback(req, res, signup = false) {
    const user = req.user
    console.log(JSON.stringify(user))

    const u = await userRepository.getById(user.id)
    if (signup === true) {
        if (u == null) {
            await userRepository.put(user)
            const jwt = user.generateJWT()
            res.redirect(`${process.env.OAUTH2_AUTHORIZED_REDIRECT_URI}?token=${jwt}`)
        }
        else {
            res.redirect(`${process.env.OAUTH2_AUTHORIZED_FAIL_REDIRECT_URI}?error=UserAlreadyExist`)
        }
    } else {
        if (u != null) {
            // success
            const jwt = u.generateJWT()
            res.redirect(`${process.env.OAUTH2_AUTHORIZED_REDIRECT_URI}?token=${jwt}`);
        }
        else {
            // error, user does not exist                
            res.redirect(`${process.env.OAUTH2_AUTHORIZED_FAIL_REDIRECT_URI}?error=UserDoesNotExist`);
        }
    }
}

router.get('/authorize/github', function (req, res, next) {
    const signup = _.defaultTo(req.query.signup, "false")
    passport.authenticate('github', {
        scope: ['user:email'],
        callbackURL: signup == 'true' ? `${process.env.OAUTH2_GITHUB_CALLBACK_URL}/signup` : process.env.OAUTH2_GITHUB_CALLBACK_URL
    })(req, res, next);
});

router.get('/callback/github',
    passport.authenticate('github', { failureRedirect: '/fail' }),
    (req, res) => {
        handleCallback(req, res, false)
    }
);

router.get('/callback/github/signup',
    passport.authenticate('github', { failureRedirect: '/fail' }),
    (req, res) => {
        handleCallback(req, res, true)
    }
);

router.get('/authorize/google', function (req, res, next) {
    const signup = _.defaultTo(req.query.signup, "false")
    passport.authenticate('google', {
        scope: [
            "email",
            "profile",
            "https://www.googleapis.com/auth/userinfo.profile"
        ],
        callbackURL: signup == 'true' ? `${process.env.OAUTH2_GOOGLE_CALLBACK_URL}/signup` : process.env.OAUTH2_GOOGLE_CALLBACK_URL
    })(req, res, next);
});

router.get('/callback/google',
    passport.authenticate('google', {
        failureRedirect: '/fail', 
        scope: [
            "email",
            "profile",
            "https://www.googleapis.com/auth/userinfo.profile"
        ],
        callbackURL: `${process.env.OAUTH2_GOOGLE_CALLBACK_URL}`
    }),
    function (req, res) {
        handleCallback(req, res, false)
    }
);

router.get('/callback/google/signup',
    passport.authenticate('google', {
        failureRedirect: '/fail', 
        scope: [
            "email",
            "profile",
            "https://www.googleapis.com/auth/userinfo.profile"
        ],
        callbackURL: `${process.env.OAUTH2_GOOGLE_CALLBACK_URL}/signup`
    }),
    function (req, res) {
        handleCallback(req, res, true)
    }
);

module.exports = router;
