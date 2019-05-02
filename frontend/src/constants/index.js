console.log("NODE_ENV = " + process.env.NODE_ENV)

export const ACCESS_TOKEN = 'accessToken';

export const GOOGLE_AUTH_URL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/google?signup=false`;
export const FACEBOOK_AUTH_URL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/facebook?signup=false`;
export const GITHUB_AUTH_URL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/github?signup=false`;

export const GOOGLE_SIGNUP_URL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/google?signup=true`;
export const FACEBOOK_SIGNUP_URL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/facebook?signup=true`;
export const GITHUB_SIGNUP_URL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/github?signup=true`;
