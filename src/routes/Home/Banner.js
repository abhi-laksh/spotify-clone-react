import React from 'react';
import { Link } from 'react-router-dom';

import bgImg from '../../assets/images/a.jpg';
import { isAuthenticated } from '../../backend/helpers/auth';

function Banner(props) {

    return (
        <section className="banner-home" style={{ background: `url(${bgImg})` }}>
            <div className="banner-overlay">
                <div className="container">
                    <div className="banner-content">
                        {
                            (isAuthenticated() && isAuthenticated().user)
                                ? (
                                    <>
                                        <h2 className="text-white text-uppercase">
                                            Welcome, <span className="text-secondary1">{isAuthenticated().user.name}</span>
                                        </h2>
                                        <p className="text-white ">Wanna cheer up ?</p>
                                        {
                                            isAuthenticated().user.role === 1
                                                ? (
                                                    <Link
                                                        className="button-secondary1 text-white text-uppercase"
                                                        to="/admin"
                                                    >
                                                        go to dashboard
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        className="button-secondary1 text-white text-uppercase"
                                                        to="/favourites"
                                                    >
                                                        go to favourites
                                                    </Link>
                                                )
                                        }
                                    </>
                                )
                                : (
                                    <>
                                        <h2 className="text-white text-uppercase">Music for everyone</h2>
                                        <p className="text-white ">Millions of songs</p>
                                        <Link
                                            className="button-secondary1 text-white text-uppercase"
                                            to="/signup"
                                        >
                                            sign up here
                                        </Link>
                                    </>
                                )
                        }
                    </div>
                </div>
            </div >
        </section >
    );
}

export default Banner;