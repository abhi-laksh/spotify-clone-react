import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getAllSongs } from '../../../../backend/helpers/song';
import { useState } from 'react';

SearchBox.propTypes = {
    show: PropTypes.bool
};

function SearchBox({ show, ...props }) {


    const [searchResults, setSearchResults] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [allSongs, setAllSongs] = useState([]);

    const handleSearch = (e) => {

    }


    const preload = () => {
        getAllSongs().then((resp) => {
            if (resp && resp.songs) {
                setAllSongs(resp.songs);
            }
        });
    }


    useEffect(() => {
        preload();
    }, [])

    return (
        <div className={"topbar-search" + (show ? " show" : "")} id="form-search-dashboard">
            <form action="" className="topbar-search-form">
                <div className="topbar-search-parent border border-primary1">
                    <input
                        type="text"
                        placeholder="Search Songs, Artist , Moods"
                        className="input topbar-search-input input-primary2"
                    />
                    <button type="button" className="button-primary2 topbar-search-btn">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBox;