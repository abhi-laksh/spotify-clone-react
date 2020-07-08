import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Dropdown.propTypes = {
    show: PropTypes.bool
};
function Dropdown({
    show,
    parentClass = "",
    children,
    ...props
}) {
    return (
        <ul
            className={`topbar-nav-dropdown default-drop p-0 ${parentClass}${(show ? " show" : "")}`}
            id="menu-drop"
        >
            {
                children
            }
        </ul>
    );
}

export default Dropdown;