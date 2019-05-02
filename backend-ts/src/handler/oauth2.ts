import { Router, Request, Response } from 'express';
import * as passport from 'passport';
import * as _ from "lodash";
import { User } from '../model/user';
import { userRepository } from '../repo/repoFactory';
import { AuthenticateOptions } from 'passport';

const router: Router = Router()

async function handleCallback(req: Request, res: Response, signup: Boolean = false) {
    const user: User = req.user
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

router.get('/authorize/github', (req:Request, res: Response, next: any) => {
    const signup = _.defaultTo(req.query.signup, "false")
    passport.authenticate('github', {
        scope: ['user:email'],
        // Provider extra parameter callbackURL as force cast the object to AuthenticateOptions
        callbackURL: signup == 'true' ? `${process.env.OAUTH2_GITHUB_CALLBACK_URL}/signup` : process.env.OAUTH2_GITHUB_CALLBACK_URL
    } as AuthenticateOptions)(req, res, next)
})

router.get('/callback/github',
    passport.authenticate('github', { failureRedirect: '/fail' }),
    (req: Request, res: Response) => {
        handleCallback(req, res, false)
    }
)

router.get('/callback/github/signup',
    passport.authenticate('github', { failureRedirect: '/fail' }),
    (req: Request, res: Response) => {
        handleCallback(req, res, true)
    }
)

router.get('/authorize/google', function (req: Request, res: Response, next: any) {
    const signup = _.defaultTo(req.query.signup, "false")
    passport.authenticate('google', {
        scope: [
            "email",
            "profile",
            "https://www.googleapis.com/auth/userinfo.profile"
        ],
        // Provider extra parameter callbackURL as force cast the object to AuthenticateOptions
        callbackURL: signup == 'true' ? `${process.env.OAUTH2_GOOGLE_CALLBACK_URL}/signup` : process.env.OAUTH2_GOOGLE_CALLBACK_URL
    } as AuthenticateOptions)(req, res, next)
})

router.get('/callback/google',
    passport.authenticate('google', {
        scope: [
            "email",
            "profile",
            "https://www.googleapis.com/auth/userinfo.profile"
        ],
        // Provider extra parameter callbackURL as force cast the object to AuthenticateOptions
        callbackURL: `${process.env.OAUTH2_GOOGLE_CALLBACK_URL}`
    } as AuthenticateOptions),
    (req: Request, res: Response) => {
        handleCallback(req, res, false)
    }
)

router.get('/callback/google/signup',
    passport.authenticate('google', {
        scope: [
            "email",
            "profile",
            "https://www.googleapis.com/auth/userinfo.profile"
        ],
        // Provider extra parameter callbackURL as force cast the object to AuthenticateOptions
        callbackURL: `${process.env.OAUTH2_GOOGLE_CALLBACK_URL}/signup`
    } as AuthenticateOptions),
    (req: Request, res: Response) => {
        handleCallback(req, res, true)
    }
)

export { router }
