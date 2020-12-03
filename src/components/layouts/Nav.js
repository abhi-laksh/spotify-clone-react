import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signOut } from '../../backend/helpers/auth';
import Dropdown from '../commons/Dropdown';

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return " active";
    } else {
        return "";
    }
}

function Nav({ history }) {

    const [showDrop, setShowDrop] = useState(false);

    const toggleDrop = () => { setShowDrop(!showDrop) }

    const logout = () => {
        signOut(() => {
            history.push("/");
        })
    }

    return (
        <nav className="navbar navbar-expand">
            <div className="container">
                <Link to="/" className="navbar-brand link-white">Dhoni</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className={`nav-item${currentTab(history, "/")}`}>
                            <Link to="/" className="nav-link text-capitalize hover-secondary2">Home</Link>
                        </li>
                        <li className={`nav-item${currentTab(history, "/webplayer")}`}>
                            <Link to="/webplayer" className="nav-link text-capitalize hover-secondary2">web player</Link>
                        </li>
                        {
                            !(isAuthenticated() && isAuthenticated().user)
                                ? (
                                    <>
                                        <li className={`nav-item${currentTab(history, "/signin")}`}>
                                            <Link to="/signin" className="nav-link text-capitalize hover-secondary2">sign in</Link>
                                        </li>

                                        <li className={`nav-item${currentTab(history, "/signup")}`}>
                                            <Link to="/signup" className="nav-link text-capitalize hover-secondary2">sign Up</Link>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <button type="button" onClick={toggleDrop} className="nav-link text-capitalize hover-secondary2" href="#">
                                            Profile <i className="ml-1 fas fa-angle-down"></i>
                                        </button>
                                        <Dropdown show={showDrop}>
                                            {
                                                !(isAuthenticated() && isAuthenticated().user.role === 1)
                                                && (
                                                    <li className="topbar-nav-dropdown-item">
                                                        <Link
                                                            className="topbar-nav-dropdown-link link-white button-primary2"
                                                            to="/account"
                                                        >
                                                            <i className="fas fa-user mr-1"></i> Account
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                            <li className="topbar-nav-dropdown-item">
                                                <button
                                                    onClick={logout}
                                                    className="topbar-nav-dropdown-link w-100 link-white button-primary2"
                                                >
                                                    <i className="fas fa-sign-out-alt mr-1"></i> Logout
                                                </button>
                                            </li>
                                        </Dropdown>
                                    </li>
                                )
                        }

                        <li className={`nav-item${currentTab(history, "/webplayer")}`}>
                            <a href="https://github.com/abhi-laksh/react-php-dhoni" className="nav-link text-capitalize hover-secondary2" >
                                <i class="fab fa-github mr-2"></i>
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(Nav);