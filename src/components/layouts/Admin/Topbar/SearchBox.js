import React from 'react';
import PropTypes from 'prop-types';

SearchBox.propTypes = {
    show: PropTypes.bool
};

function SearchBox({ show, ...props }) {
    return (
        <div className={"topbar-search" + (show ? " show" : "")} id="form-search-dashboard">
            <form action="" className="topbar-search-form">
                <div className="topbar-search-parent border border-primary1">
                    <input type="text" placeholder="Search Here..." className="input topbar-search-input input-primary2" />
                    <button type="button" className="button-primary2 topbar-search-btn">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBox;