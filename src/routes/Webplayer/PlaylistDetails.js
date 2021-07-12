import React, { useEffect, useState } from 'react';
import { BACKEND } from '../../backend/api';
import { isAuthenticated } from '../../backend/helpers/auth';
import { getAllSongsByPlaylistId } from '../../backend/helpers/user';
import Layout from '../../components/layouts/Webplayer/Layout';
import SongList from '../../components/layouts/Webplayer/Playlist/SongList';
import SongCard from '../../components/layouts/Webplayer/SongCard/SongCard';

function PlaylistDetails({ match, ...props }) {

    const { params = {} } = match;

    const [status, setStatus] = useState({
        error: false,
        success: false,
        msg: "",
    });

    const [allSongs, setAllSongs] = useState();

    const [queue, setQueue] = useState([]);

    const [showSonglist, setShowSonglist] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);

    const preloadSongs = () => {

        const token = isAuthenticated() && isAuthenticated().user && isAuthenticated().token;

        getAllSongsByPlaylistId((params.id), token).then((resp) => {
            if (resp) {
                if (resp.error) {
                    setStatus({
                        error: true,
                        success: false,
                        msg: (resp && resp.error) || "There is an error."
                    })

                } else {
                    setAllSongs([{ id: "99999999" }].concat(resp.songs));
                }
            }
        })

    }

    const openSongList = (e) => {

        e.stopPropagation();

        setShowSonglist(true)

    };


    const closeSongList = (e) => {
        setShowSonglist(false);

    };

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
            empty={!item.song_id}
            key={item.song_id}
            title={item.song_name}
            artist={item.artist_name}
            genre={item.genre_name}
            mood={item.mood_name}
            artist={item.artist_name}
            thumbail={item.thumbnail ? `${BACKEND}/${item.thumbnail}` : null}
            // thumbail={item.thumbnail ? `${BACKEND}/${item.thumbnail}` : null}
            isPlaying={currentSong === item.song_id}
            onClick={!item.song_id ? openSongList : playThisSong(item.song_id)}
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
        
        if(params.id){
            preloadSongs();
        }

    }, [JSON.stringify(params)])

    return (
        <Layout title={"Playlist Details"} setCurrentSong={setCurrentSong} queue={queue} currentSong={currentSong}>
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

            <SongList
                show={showSonglist}
                onHide={closeSongList}
                title="Add/Remove Songs to Playlist"
                afterSubmit={preloadSongs}
                selectedId={params.id}
            />
        </Layout>
    );
}

export default PlaylistDetails;