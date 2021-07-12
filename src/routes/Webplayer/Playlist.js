import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { isAuthenticated } from '../../backend/helpers/auth';
import { deletePlaylist, getAllPlaylists } from '../../backend/helpers/user';
import Layout from '../../components/layouts/Webplayer/Layout';
import AddPlaylistForm from '../../components/layouts/Webplayer/Playlist/AddPlaylistForm';
import PlaylistCard from '../../components/layouts/Webplayer/Playlist/PlaylistCard';
import SongList from '../../components/layouts/Webplayer/Playlist/SongList';


const Playlist = () => {

    const [status, setStatus] = useState({
        error: false,
        success: false,
        msg: "",
    });

    const [data, setData] = useState([{ id: "9999999" }]);

    const history = useHistory()

    const [showModal, setShowModal] = useState(false);
    const [showSonglist, setShowSonglist] = useState();
    
    const [selectedId, setSelectedId] = useState(null);

    const preloadData = () => {
        const token = isAuthenticated() && isAuthenticated().user && isAuthenticated().token;

        getAllPlaylists(token).then((resp) => {
            if (resp) {
                if (resp.error) {
                    setStatus({
                        error: true,
                        success: false,
                        msg: (resp && resp.error) || "There is an error."
                    })

                } else {
                    setData([{ id: "9999999" }].concat(resp.playlists));
                }
            }
        })
    }

    const openModal = (id) => (e) => {
        
        e.stopPropagation();

        setShowModal(true)

        setSelectedId(id)

    };


    const closeModal = () => {
        setShowModal(false);

        setSelectedId(null)

    };

    const openSongList = (id) => (e) => {
        
        e.stopPropagation();

        setShowSonglist(true)

        setSelectedId(id)

    };


    const closeSongList = (e) => {
        setShowSonglist(false);

        setSelectedId(null)

    };

    const deleteData = (id) => (e) => {
        e.stopPropagation();
        const token = isAuthenticated() && isAuthenticated().user && isAuthenticated().token;

        deletePlaylist({
            id
        }, token).then((resp) => {
            console.log('=========onDelete===========================');
            if (resp) {
                if (resp.msg) {
                    preloadData()
                }
            }
        })

    };

    const goToPlaylistPage = (id) => (e) => {
        history.push(`/playlist/details/${id}`)
    };

    const Playlists = (item, index) => (
        <PlaylistCard
            key={item.id}
            // thumbail={item.thumbnail ? `${BACKEND}/${item.thumbnail}` : null}
            onClick={!item.name ? openModal() : goToPlaylistPage(item.id)}
            onEdit={openModal(item.id)}
            onDelete={deleteData(item.id)}
            onAddSong={openSongList(item.id)}
            title={item.name ? item.name : "Create New Playlist"}
            empty={!item.name}
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
        preloadData();
    }, []);

    return (

        <Layout title={"Playlists"} >
            {
                <div className="row no-gutters">
                    {
                        data.map(Playlists)
                    }
                </div>
            }

            <AddPlaylistForm
                show={showModal}
                onHide={closeModal}
                title={selectedId ? "Edit Playlist" : "Create Playlist"}
                afterSubmit={preloadData}
                selectedId={selectedId}
            />

            <SongList
                show={showSonglist}
                onHide={closeSongList}
                title="Add Songs to Playlist"
                afterSubmit={preloadData}
                selectedId={selectedId}
            />
        </Layout>
    )
}

export default Playlist
