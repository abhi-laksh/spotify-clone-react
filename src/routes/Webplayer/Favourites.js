import React, { useEffect } from 'react';
import Layout from '../../components/layouts/Webplayer/Layout';
import SongCard from '../../components/layouts/Webplayer/SongCard/SongCard';
import { getAllSongs } from '../../backend/helpers/song';
import notFound from '../../assets/images/404.svg';
import { useState } from 'react';
import { BACKEND } from '../../backend/api';
import { getAllFav } from '../../backend/helpers/user';
import { isAuthenticated } from '../../backend/helpers/auth';
function Favourites(props) {


    const [status, setStatus] = useState({
        error: false,
        success: false,
        msg: "",
    });

    const [allSongs, setAllSongs] = useState([]);

    const [queue, setQueue] = useState([]);

    const [currentSong, setCurrentSong] = useState(null);

    const preloadSongs = () => {
        const token = isAuthenticated() && isAuthenticated().user && isAuthenticated().token;

        getAllFav(token).then((resp) => {
            if (!resp || resp.error) {
                setStatus({
                    error: true,
                    success: false,
                    msg: (resp && resp.error) || "There is an error."
                })

            } else {
                setAllSongs(resp.favorites);

            }
        })
    }

    const playThisSong = (id) => () => {
        if (!(queue.indexOf(id) !== -1)) {
            let thisQueue = queue.concat();
            thisQueue.push(id);
            setQueue(thisQueue);
        }
        setCurrentSong(id);
    }

    const Songs = (item, index) => (
        <SongCard
            key={item.song_id}
            title={item.song_name}
            artist={item.artist_name}
            genre={item.genre_name}
            mood={item.mood_name}
            artist={item.artist_name}
            thumbail={item.thumbnail ? `${BACKEND}/${item.thumbnail}` : null}
            // thumbail={item.thumbnail ? `${BACKEND}/${item.thumbnail}` : null}
            isPlaying={currentSong === item.song_id}
            onClick={playThisSong(item.song_id)}
        />
    )

    //auto remove msg
    useEffect(() => {
        (status.error || status.success) && setTimeout(() => {
            setStatus({
                error: false,
                success: false,
                msg: "",
            });
        }, 3000)
    }, [status.error, status.success])


    useEffect(() => {
        preloadSongs();
    }, [])

    return (
        <Layout title={"Favourites"} setCurrentSong={setCurrentSong} queue={queue} currentSong={currentSong}>
            {
                allSongs && allSongs.length
                    ? (
                        <div className="row no-gutters">
                            {
                                allSongs.map(Songs)
                            }
                        </div>
                    ) : (
                        <div></div>
                    )
            }
        </Layout>
    );
}

export default Favourites;