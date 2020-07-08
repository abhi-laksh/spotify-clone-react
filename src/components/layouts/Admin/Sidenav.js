import React, { useState, useEffect } from 'react';
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
                        <Link to="/admin" className={`sidenav-link ${currentTab(history, "/admin")}`}>
                            <i className="fas fa-home"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className="sidenav-item">
                        <p className="text-center  sidenav-title"><span className="bg-primary2">Artists</span></p>
                    </li>

                    <li className="sidenav-item">
                        <Link to="/admin/artists" className={`sidenav-link ${currentTab(history, "/admin/artists")}`}>
                            <i className="fas fa-user-tie"></i>
                            <span>All Artists</span>
                        </Link>
                    </li>
                    <li className="sidenav-item">
                        <Link to="/admin/artists/add" className={`sidenav-link ${currentTab(history, "/admin/artists/add")}`}>
                            <i className="fas fa-user-plus"></i>
                            <span>Add Artist</span>
                        </Link>
                    </li>

                    <li className="sidenav-item">
                        <p className="text-center  sidenav-title"><span className="bg-primary2">Genres</span></p>
                    </li>

                    <li className="sidenav-item">
                        <Link to="/admin/genres" className={`sidenav-link ${currentTab(history, "/admin/genres")}`}>
                            <i className="fas fa-guitar"></i>
                            <span>All Genres</span>
                        </Link>
                    </li>
                    <li className="sidenav-item">
                        <Link to="/admin/genres/add" className={`sidenav-link ${currentTab(history, "/admin/genres/add")}`}>
                            <i className="fas fa-guitar"></i>
                            <i className="fas fa-plus sub-icon"></i>
                            <span>Add Genre</span>
                        </Link>
                    </li>

                    <li className="sidenav-item">
                        <p className="text-center  sidenav-title"><span className="bg-primary2">Moods</span></p>
                    </li>

                    <li className="sidenav-item">
                        <Link to="/admin/moods" className={`sidenav-link ${currentTab(history, "/admin/moods")}`}>
                            <i className="far fa-smile"></i>
                            <span>All Moods</span>
                        </Link>
                    </li>
                    <li className="sidenav-item">
                        <Link to="/admin/moods/add" className={`sidenav-link ${currentTab(history, "/admin/moods/add")}`}>
                            <i className="far fa-smile"></i>
                            <i className="fas fa-plus sub-icon ml-1"></i>
                            <span>Add Mood</span>
                        </Link>
                    </li>

                    <li className="sidenav-item">
                        <p className="text-center  sidenav-title"><span className="bg-primary2">Songs</span></p>
                    </li>

                    <li className="sidenav-item">
                        <Link to="/admin/songs" className={`sidenav-link ${currentTab(history, "/admin/songs")}`}>
                            <i className="fas fa-music"></i>
                            <span>All Song</span>
                        </Link>
                    </li>
                    <li className="sidenav-item">
                        <Link to="/admin/songs/add" className={`sidenav-link ${currentTab(history, "/admin/songs/add")}`}>
                            <i className="fas fa-music"></i>
                            <i className="fas fa-plus sub-icon ml-1"></i>
                            <span>Add Song</span>
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