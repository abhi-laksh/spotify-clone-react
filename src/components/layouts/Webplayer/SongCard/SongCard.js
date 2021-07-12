import React from 'react';
import play from '../../../../assets/images/play.svg';
import piano from '../../../../assets/images/rain.jpg';


SongCard.propTypes = {
};

function SongCard({
    thumbail,
    title = "Unknown Song",
    artist = "Unknown",
    mood = "Unknown",
    genre = "Unknown",
    isPlaying = false,
    empty = false,
    onClick = () => { },
    ...props
}) {

    return empty ? (
        <div className="col-sm-2 text-center " >
            <button className={"p-3 button w-100"} onClick={onClick}>
                <div
                    className="playlist-thumbnail border border-primary2 noHover"
                    style={{
                        height: 140,
                        position: "relative"
                    }}
                >
                    <span>
                        <i className="fas fa-plus-circle absoluteCenter  text-primary2"></i>
                    </span>
                </div>

                <h3 title={'Add Song'} className={`playlist-name text-grey text-capitalize`}>
                    Add Song
                </h3>
            </button>
        </div>
    ) : (
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