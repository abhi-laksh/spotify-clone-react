import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SongInfo from './SongInfo';
import Control from './Control';
import { getSongbyId } from '../../../../backend/helpers/song';
import { BACKEND, STREAM } from '../../../../backend/api';

Player.propTypes = {

};

// secondary1
function Player({ currentSong, queue, setCurrentSong = () => { }, ...props }) {

    const [status, setStatus] = useState({
        error: false,
        success: false,
        msg: "",
    });

    const [currentSongInfo, setCurrentSongInfo] = useState({
        song_id: null,
        song_name: null,
        song_description: null,
        length: null,
        artist_name: null,
        genre_name: null,
        mood_name: null,
        file_path: null,
        thumbnail: null,
    });

    const {
        song_id,
        song_name,
        length,
        artist_name,
        thumbnail,
    } = currentSongInfo;

    const preloadSong = () => {
        getSongbyId(currentSong).then((resp) => {
            if (!resp || resp.error) {
                setStatus({
                    error: true,
                    success: false,
                    msg: (resp && resp.error) || "There is an error."
                });
            } else {
                let thumbnail;

                if (resp.song.thumbnail) {
                    thumbnail = `${BACKEND}/${resp.song.thumbnail}`;
                }

                setCurrentSongInfo({
                    song_id: resp.song.id,
                    song_name: resp.song.song_name,
                    song_description: resp.song.song_description,
                    length: resp.song.length,
                    artist_name: resp.song.artist_name,
                    genre_name: resp.song.genre_name,
                    mood_name: resp.song.mood_name,
                    thumbnail: thumbnail
                });
            }
        });
    }

    useEffect(() => {
        currentSong && preloadSong();
    }, [currentSong])


    return (
        <footer id="player-main" className="player bg-primary2">
            <SongInfo
                title={song_name}
                artist={artist_name}
                thumbnail={thumbnail}
                currentSongId={currentSong}
            />
            <Control setCurrentSong={setCurrentSong} queue={queue} songId={song_id} length={length} />
        </footer>
    );
}

export default Player;