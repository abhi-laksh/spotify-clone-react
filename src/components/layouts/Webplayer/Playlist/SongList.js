import React from 'react';
import { isAuthenticated } from '../../../../backend/helpers/auth';
import { getAllSongs } from '../../../../backend/helpers/song';
import { addSongsToPlaylist, getAllSongsByPlaylistId, removeSongsFromPlaylist } from '../../../../backend/helpers/user';
import AppModal from '../../../commons/AppModal';

const SongList = ({ selectedId, afterSubmit = () => { }, ...props }) => {

    const [status, setStatus] = React.useState({
        error: false,
        success: false,
        msg: "",
    });

    const [allSongs, setAllSongs] = React.useState([]);

    const [playlistSong, setPlaylistSong] = React.useState([]);

    console.log('=================playlistSong===================');
    console.log(playlistSong, selectedId);
    console.log('================playlistSong====================');

    const [queue, setQueue] = React.useState([]);

    const [currentSong, setCurrentSong] = React.useState(null);

    const getIds = (id) => {
        return playlistSong.findIndex((each => each.song_id === id));
    }

    const addOrRemoveSongs = (songId) => () => {

        const token = isAuthenticated() && isAuthenticated().user && isAuthenticated().token;

        if (getIds(songId) > -1) {
            removeSongsFromPlaylist({
                id: selectedId,
                songs: [songId],

            }, token).then((resp) => {
                if (resp) {
                    if (resp.msg) {
                        preloadSongs()
                    }
                }
            })
        } else {

            addSongsToPlaylist({
                id: selectedId,
                songs: [songId],
            }, token).then((resp) => {
                if (resp) {
                    if (resp.msg) {
                        preloadSongs()
                    }
                }
            })
        }

    }



    const preloadSongs = () => {
        const token = isAuthenticated() && isAuthenticated().user && isAuthenticated().token;

        getAllSongs().then((resp) => {
            if (!resp || resp.error) {
                setStatus({
                    error: true,
                    success: false,
                    msg: (resp && resp.error) || "There is an error."
                })

            } else {
                setAllSongs(resp.songs);

            }
        });

        if (selectedId) {

            getAllSongsByPlaylistId(selectedId, token).then((resp) => {
                if (!resp || resp.error) {
                    setStatus({
                        error: true,
                        success: false,
                        msg: (resp && resp.error) || "There is an error."
                    })

                    setPlaylistSong([]);

                } else {
                    setPlaylistSong(resp.songs);

                }
            });

        }
        afterSubmit()
    }

    const SongRow = (item, index) => {
        return (
            <div className={`song-row-item align-items-center row${index >= (allSongs.length - 1) ? "" : " mb-3"}`}>
                <div className="song-row-item-img col-9">
                    <span className="text-primary2">
                        {item.song_name + " - " + item.artist_name}
                    </span>
                </div>
                <div className="song-row-item-img col-3">
                    <button
                        onClick={addOrRemoveSongs(item.id)}
                        className="py-2 px3 bg-grey button w-100 postion-relative"
                    >
                        {
                            getIds(item.id) > -1 ? (
                                <>
                                    <span className="text-primary2 mr-2">Remove</span>
                                    <i className="fas fa-minus-circle text-primary2"></i>
                                </>
                            ) : (
                                <>

                                    <span className="text-primary2 mr-2">Add</span>
                                    <i className="fas fa-plus-circle text-primary2"></i>
                                </>
                            )
                        }
                    </button>
                </div >
            </div >
        )
    }



    //auto remove msg
    React.useEffect(() => {
        (status.error || status.success) && setTimeout(() => {
            setStatus({
                error: false,
                success: false,
                msg: "",
            });
        }, 3000)
    }, [status.error, status.success])

    React.useEffect(() => {
        if (selectedId) {
            preloadSongs();
        }
    }, [selectedId])


    return (
        <AppModal {...props}>
            {
                allSongs.map(SongRow)
            }
        </AppModal>
    )
}

export default SongList
