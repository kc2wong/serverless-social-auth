import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom'
import { GOOGLE_SIGNUP_URL, FACEBOOK_SIGNUP_URL, GITHUB_SIGNUP_URL } from '../../constants';
import { signup } from '../../util/APIUtils';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';
import { LoadingOverlay, Loader } from 'react-overlay-loader';

import 'react-overlay-loader/styles.css';

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = { loading: false }
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
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Signup with Serverless Social Auth</h1>
                    {loading && <Loader fullPage loading />}
                    <SocialSignup setLoading={this.setLoading} />
                    <span className="login-link">Already have an account? <Link to="/login">Login</Link></span>
                </div>
            </div>
        );
    }

    setLoading = () => {
        this.setState({ loading: true })
    }    
}

class SocialSignup extends Component {
    render() {
        return (
            <div className="social-signup">
                <a className="btn btn-block social-btn google" href={GOOGLE_SIGNUP_URL} onClick={this.props.setLoading}>
                    <img src={googleLogo} alt="Google" /> Sign up with Google</a>
                {/* <a className="btn btn-block social-btn facebook" href={FACEBOOK_SIGNUP_URL}>
                    <img src={fbLogo} alt="Facebook" /> Sign up with Facebook</a> */}
                <a className="btn btn-block social-btn github" href={GITHUB_SIGNUP_URL} onClick={this.props.setLoading}>
                    <img src={githubLogo} alt="Github" /> Sign up with Github</a>
            </div>
        );
    }
}

export default Signup