import React, { useState } from 'react';
import SearchBox from './SearchBox';
import Dropdown from '../../../commons/Dropdown';
import { Link } from 'react-router-dom';

function Topbar(props) {

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

    return (
        <div className={"topbar py-2 px-3 bg-primary2" + (toggleSearchBox ? " search-opened" : "")}>
            <SearchBox show={toggleSearchBox} />
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
                </ul>
            </nav>
        </div>
    );
}

export default Topbar;