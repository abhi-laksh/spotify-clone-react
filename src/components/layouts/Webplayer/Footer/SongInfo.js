import React from 'react';

import thumbnailDefault from '../../../../assets/images/rain.jpg';
import { useState } from 'react';
import { addToFav, getAllFav, getFavBySong, removeFromFav } from '../../../../backend/helpers/user';
import { isAuthenticated } from '../../../../backend/helpers/auth';
import { useEffect } from 'react';
function SongInfo({ title, artist, thumbnail, currentSongId, ...props }) {

    const [status, setStatus] = useState({
        error: false,
        success: false,
        msg: "",
    });

    const [favourite, setFavourite] = useState(null);

    const preload = () => {
        const token = isAuthenticated() && isAuthenticated().user && isAuthenticated().token;
        if (token) {
            getFavBySong(currentSongId, token).then((resp) => {
                if (!resp || (resp && resp.error)) {
                    setStatus({
                        error: true,
                        success: false,
                        msg: (resp && resp.error) || "There is an error."
                    });
                } else {
                    if (resp.favorite) {
                        setFavourite(resp.favorite.song_id);
                    } else {
                        setFavourite(null);
                    }
                }
            });
        }
    }

    const toggleFavourite = () => {
        const token = isAuthenticated() && isAuthenticated().user && isAuthenticated().token;
        if (token) {
            if (favourite) {
                removeFromFav(currentSongId, token).then((resp) => {
                    if (!resp || resp.error) {
                        setStatus({
                            error: true,
                            success: false,
                            msg: (resp && resp.error) || "There is an error."
                        });
                    } else {
                        preload();
                    }
                }).catch((e) => { console.warn(e) });
            } else {
                addToFav(currentSongId, token).then((resp) => {
                    if (!resp || resp.error) {
                        setStatus({
                            error: true,
                            success: false,
                            msg: (resp && resp.error) || "There is an error."
                        });
                    } else {
                        preload();
                    }
                }).catch((e) => { console.warn(e) });
            }
        } else {
            setStatus({
                error: true,
                success: false,
                msg: "You need to login first!"
            })
        }

    }


    useEffect(() => {
        preload();
    }, [currentSongId]);

    return (

        <div className="player-song">
            <div className="player-song">
                <div className="player-song-img border border-secondary2">
                    <img src={thumbnail || thumbnailDefault} alt="piano" />
                </div>
                <div className="player-song-name">
                    <h6 title={title} className="text-secondary2 name mb-1"> {title || "unknown song"}</h6>
                    <p title={artist} className="text-secondary2 artist mb-0" href="#">{artist || "Unknown artist"}</p>
                </div>
                <div className="player-song-addFav">
                    <button title={!currentSongId ? "You need to login first!" : null} disabled={!currentSongId} onClick={toggleFavourite} type="button" className={`player-controls-btn ${favourite ? "active" : ""}`} id="addToFav">
                        {
                            !favourite
                                ? <i className="far fa-heart"></i>
                                : <i className="fas fa-heart"></i>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SongInfo;