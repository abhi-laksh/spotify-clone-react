import React, { useState } from 'react';
import SearchBox from './SearchBox';
import Dropdown from '../../../commons/Dropdown';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signOut } from '../../../../backend/helpers/auth';

function Topbar({ history, allSongs }) {

    const CloseIcon = ({ active = false }) => <span className={"closeIcon" + (!active ? " d-none" : " d-inline")} style={{ fontSize: "1.125rem", fontWeight: 600 }}> X</span >

    const [toggleSearchBox, setToggleSearchBox] = useState(false);

    const [toggleDropdown, setToggleDropdown] = useState(null);

    const isMenu = (toggleDropdown === "menu");
    const isProfile = (toggleDropdown === "profile");
    const isNotify = (toggleDropdown === "notify");

    const showDropdown = (name) => () => {
        switch (toggleDropdown) {
            case name:
                setToggleDropdown(null);
                return;
            default:
                setToggleDropdown(name);
                return;
        }
    }

    const logout = () => {
        signOut(() => {
            history.push("/");
        })
    }

    return (
        <div className={"topbar py-2 px-3 bg-primary2" + (toggleSearchBox ? " search-opened" : "")}>
            <nav className="topbar-nav">
                <ul>
                    <li className="topbar-nav-item">
                        <button
                            className="topbar-nav-btn button-primary2"
                            id="topbar-menu-dropdown-toggler"
                            onClick={showDropdown("menu")}
                        >
                            <i className={"fas fa-ellipsis-v" + (isMenu ? " d-none" : "")}></i>
                            <CloseIcon active={isMenu} />
                        </button>
                        <Dropdown show={isMenu} >

                            <li className="topbar-nav-dropdown-item">
                                <Link
                                    className="topbar-nav-dropdown-link link-white button-primary2"
                                    to="/"
                                >
                                    <i className="fas fa-home mr-1"></i> Visit Home
                                </Link>
                            </li>
                        </Dropdown>
                    </li>
                    {
                        isAuthenticated() && isAuthenticated().user && (
                            <li className="topbar-nav-item">
                                <button
                                    className="topbar-nav-btn button-primary2 "
                                    id="topbar-user-dropdown-toggler"
                                    onClick={showDropdown("profile")}
                                >
                                    <i className={"far fa-user" + (isProfile ? " d-none" : "")}></i>
                                    <CloseIcon active={isProfile} />
                                </button>

                                <Dropdown show={isProfile} >
                                    <li className="topbar-nav-dropdown-item">
                                        <Link
                                            className="topbar-nav-dropdown-link link-white button-primary2"
                                            to="/account"
                                        >
                                            <i className="fas fa-user mr-1"></i> Account
                                            </Link>
                                    </li>
                                    <li className="topbar-nav-dropdown-item">
                                        <button
                                            className="topbar-nav-dropdown-link w-100 link-white button-primary2"
                                            onClick={logout}

                                        >
                                            <i className="fas fa-sign-out-alt mr-1"></i> Logout
                                        </button>
                                    </li>
                                </Dropdown>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </div>
    );
}

export default withRouter(Topbar);