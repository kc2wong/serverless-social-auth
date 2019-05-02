import React, { Component } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

class NotFound extends Component {
	getUrlParameter = (name) => {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		let results = regex.exec(window.location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	};
	
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    Error
                </h1>
                <div className="desc">
                    {this.getUrlParameter('error')}
                </div>
                <Link to="/"><button className="go-back-btn btn btn-primary" type="button">Go Back</button></Link>
            </div>
        );
    }
}

export default NotFound;