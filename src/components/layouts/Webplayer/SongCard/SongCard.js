import React from 'react';
import PropTypes from 'prop-types';

import piano from '../../../../assets/images/rain.jpg';
import play from '../../../../assets/images/play.svg';

SongCard.propTypes = {
};

function SongCard({
    thumbail,
    title = "Unknown Song",
    artist = "Unknown",
    mood = "Unknown",
    genre = "Unknown",
    isPlaying = false,
    onClick = () => { },
    ...props
}) {

    return (
        <div className="col-sm-2">
            <div className="song p-3">
                <button className="song-btn" onClick={onClick} >
                    <div className="song-thumbnail">
                        <img src={thumbail || piano} alt="" />
                        <span><img src={play} alt="" /></span>
                    </div>
                    <h3 title={title} className={`song-name ${isPlaying ? "text-secondary2" : "text-grey"} text-capitalize`}>
                        {title}
                    </h3>
                </button>
                <div className="song-info">
                    <span title={artist} className="text-grey text-capitalize">{artist}</span>
                    <span title={mood} className="text-grey text-capitalize">{mood}</span>
                    <span title={genre} className="text-grey text-capitalize">{genre}</span>
                </div>
            </div>
        </div>
    );
}

export default SongCard;