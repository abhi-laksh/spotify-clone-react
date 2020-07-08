import React, { useEffect } from 'react';
import userSvg from '../../../assets/images/user.svg';
function SideMenu({ userImg, ...props }) {


    useEffect(() => {

    }, [userImg])

    return (
        <div className="section-account-menu bg-primary1">
            <div className="section-account-menu-user">
                <div className="section-account-menu-user-img" >
                    <img src={userImg || userSvg} alt="user" />
                </div>
            </div>
            <ul className="section-account-menu-nav">
                <li className="section-account-menu-nav-item">
                    <a href="#" className="d-block section-account-menu-nav-link hover-secondary2">
                        <span>
                            <i className="fas fa-home"></i>
                        </span>
                        Account overview
                    </a>
                </li>
                <li className="section-account-menu-nav-item">
                    <a href="#" className="d-block section-account-menu-nav-link  hover-secondary2">
                        <span>
                            <i className="fas fa-pencil-alt"></i>
                        </span>
                        Edit profile
                    </a>
                </li>
                <li className="section-account-menu-nav-item">
                    <a href="#" className="d-block section-account-menu-nav-link  hover-secondary2">
                        <span>
                            <i className="fas fa-lock"></i>
                        </span>
                        Change password
                    </a>
                </li>
                <li className="section-account-menu-nav-item">
                    <a href="#" className="d-block section-account-menu-nav-link  hover-secondary2">
                        <span>
                            <i className="fas fa-user-lock"></i>
                        </span>
                        Privacy settings
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;