import React, { Component } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../../constants';
import { login } from '../../util/APIUtils';
import { Link, Redirect } from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';
import { LoadingOverlay, Loader } from 'react-overlay-loader';

import 'react-overlay-loader/styles.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = { loading: false }
    }

    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }
    
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        const { loading } = this.state;
        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">Login to Serverless Social Auth</h1>
                    {loading && <Loader fullPage loading />}
                    <SocialLogin setLoading={this.setLoading}/>
                    <span className="signup-link">New user? <Link to="/signup">Sign up</Link></span>
                </div>
            </div>
        );
    }

    setLoading = () => {
        this.setState({ loading: true })
    }
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL} onClick={this.props.setLoading}>
                    <img src={googleLogo} alt="Google" /> Log in with Google</a>
                {/* <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a> */}
                <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL} onClick={this.props.setLoading}>
                    <img src={githubLogo} alt="Github" /> Log in with Github</a>
            </div>
        );
    }
}

export default Login
