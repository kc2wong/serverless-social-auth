import { Request } from 'express';
import * as jwt from 'express-jwt';

const getTokenFromHeaders = (req: Request) => {
    const { headers: { authorization } } = req

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
        return authorization.split(' ')[1]
    }
    return null
}

const auth = {
    required: jwt({
        secret: process.env.JWT_TOKEN_SECRET,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: process.env.JWT_TOKEN_SECRET,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
}

export { auth }
