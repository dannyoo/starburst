import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = (props) => {
    const { user, logOutUser } = props;
    return (
        <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
        <div id="brand"></div>
        <div className="container-fluid">
            <NavLink to="/listing" className="navbar-brand">
                <i className="fa fa-list"></i> Starburst
            </NavLink>
        <div className="navbar-nav ml-auto">
            {user && (
            <NavLink className="nav-item nav-link" to="/listing">
                Listing
            </NavLink>
            )}
            {!user && (
            <NavLink className="nav-item nav-link" to="/login">
                Log In
            </NavLink>
            )}
            {!user && (
            <NavLink className="nav-item nav-link" to="/signup">
                Sign Up
            </NavLink>
            )}
            {user && (
            <NavLink
                className="nav-item nav-link"
                to="/listing"
                onClick={e => logOutUser(e)}
            >
                Log Out
            </NavLink>
            )}
        </div>
        </div>
    </nav>
    )
    
}

export default Navigation;