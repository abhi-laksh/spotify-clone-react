import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return " text-secondary2";
    } else {
        return "";
    }
}

function Sidenav({ history, props }) {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <header id="header-dashboard" className="section-left bg-primary2">
            <nav id="sidenav" className={"sidenav" + (isExpanded ? " expanded" : "")}>
                <ul className="text-center">
                    <li className="sidenav-item" id="sidenav-toggler-parent">
                        <button id="sidenav-toggler" className="sidenav-link " onClick={() => { setIsExpanded(!isExpanded) }}>
                            <i className="fas fa-bars"></i>
                            <span>X close</span>
                        </button>
                    </li>
                    <li className="sidenav-item">
                        <Link to="/webplayer" className={`sidenav-link ${currentTab(history, "/webplayer")}`}>
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="sidenav-item">

                        <Link to="/favourites" className={`sidenav-link ${currentTab(history, "/favourites")}`}>
                            <i className="fas fa-heart"></i>
                            <span>Favourites</span>
                        </Link>
                    </li>
                    <li className="sidenav-item">
                        <Link to="/webplayer/search" className={`sidenav-link ${currentTab(history, "/webplayer/search")}`}>
                            <i className="fas fa-search"></i>
                            <span>Search</span>
                        </Link>
                    </li>
                    <li className="sidenav-item" id="sidenav-toggler-mobile-parent">
                        <button id="sidenav-toggler-mobile" className="sidenav-link " onClick={() => { setIsExpanded(!isExpanded) }}>
                            <i className="fas fa-bars"></i>
                            <span>X close</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default withRouter(Sidenav);