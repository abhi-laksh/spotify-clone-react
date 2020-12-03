import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut, isAuthenticated } from '../../../backend/helpers/auth';

function Nav({ history }) {


    const logout = () => {
        signOut(() => {
            history.push("/");
        })
    }

    return (
        <div className="row">
            <div className="col-8">
                <div className="row">
                    <div className="col-4">
                        <div className="footer-col">
                            <Link to="/" className="footer-link logo link-white">Dhoni</Link>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="footer-col">
                            <h3 className="text-white">Quick Links</h3>
                            <ul>
                                {
                                    !(isAuthenticated() && isAuthenticated().user)
                                        ? (
                                            <>
                                                <li>
                                                    <Link to="/account" className="footer-link hover-secondary2">
                                                        Account
                                                </Link>
                                                </li>

                                                <li>
                                                    <button
                                                        onClick={logout}
                                                        className="footer-link hover-secondary2"
                                                    >
                                                        Log Out
                                                </button>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li>
                                                    <Link to="/signup" className="footer-link hover-secondary2">
                                                        Sign Up
                                                </Link>
                                                </li>
                                                <li>
                                                    <Link to="/signin" className="footer-link hover-secondary2">
                                                        Sign In
                                                </Link>
                                                </li>
                                            </>
                                        )
                                }

                            </ul>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="footer-col">
                            <h3 className="text-white">Player</h3>
                            <ul>
                                <li>
                                    <Link to="/webplayer" className="footer-link hover-secondary2">
                                        Web Player
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/favourites" className="footer-link hover-secondary2">
                                        Favourites
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="footer-col">
                    <h3 className="text-white">Social Links</h3>
                    <ul className="footer-social">
                        <li className="footer-social-list">
                            <a href="https://github.com/abhi-laksh" className="footer-social-link">
                                <i class="fab fa-github"></i>
                            </a>
                        </li>
                        <li className="footer-social-list">
                            <a href="https://www.linkedin.com/in/abhishek-soni-976023161" className="footer-social-link">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default withRouter(Nav);