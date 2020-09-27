import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layouts/Admin/Layout';

import { isAuthenticated } from '../../backend/helpers/auth';
import { getAllSongs, deleteSong } from '../../backend/helpers/song';

function Songs(props) {

    const [status, setStatus] = useState({
        error: false,
        success: false,
        msg: "",
    });

    const [allSongs, setAllSongs] = useState([]);

    const [searchText, setSearchText] = useState("");

    const searchResult = searchText && allSongs.filter((each) => {
        return (
            (each.song_name && each.song_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
            || (each.artist_name && each.artist_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
            || (each.mood_name && each.mood_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
            || (each.genre_name && each.genre_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
        )
    });

    // fetch and load all Songs
    const preload = () => {
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
        })
    }

    // Message Component
    const message = () => (
        (status.error && <p className="alert w-100 text-center alert-danger">{status.msg}</p>)
        || (status.success && <p className="alert w-100 text-center alert-success">{`${status.msg} !`}</p>)
    )


    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }


    const onDelete = (id) => {

        const token = isAuthenticated() && isAuthenticated().token;

        if (!token) {
            return () => {
                setStatus({
                    error: true,
                    success: false,
                    msg: "Login Session Expired!"
                })
            };
        }

        return ((e) => {
            // e.preventDefault();
            deleteSong({ id }, token).then((resp) => {
                console.log('====================================');
                console.log(id, resp);
                console.log('====================================');

                if (!resp || resp.error) {
                    setStatus({
                        error: true,
                        success: false,
                        msg: resp.error || "There is an error."
                    })
                } else {
                    setStatus({
                        error: false,
                        success: true,
                        msg: resp.msg
                    })
                    preload();
                }
            })
        })
    }


    const TR = (row, index) => (
        <tr key={index}>
            <th className="text-grey" scope="row">{index + 1}</th>

            <th className="text-capitalize text-grey">{row.song_name}</th>
            <th className="text-capitalize text-grey">{row.song_description}</th>
            <th className="text-capitalize text-grey">{row.length}</th>
            <th className="text-capitalize text-grey">{row.artist_name || "------"}</th>
            <th className="text-capitalize text-grey">{row.genre_name || "------"}</th>
            <th className="text-capitalize text-grey">{row.mood_name || "------"}</th>
            <th className="text-grey">{row.file_path || "------"}</th>
            <th className="text-grey">{row.thumbnail || "------"}</th>
            <td>
                <Link to={`/admin/songs/edit/${row.id}`} className="button button-primary2 text-white mr-2 p-0">
                    <i className="far fa-edit"></i>
                </Link>
                <button className="button button-error p-0" onClick={onDelete(row.id)}><i className="far fa-trash-alt"></i></button>
            </td>
        </tr>
    )

    const Search = () => (
        <input
            type="text"
            className="input input-primary2 border py-3 mb-3 border-primary1"
            placeholder="Search Songs by name, artists, moods, genres"
            value={searchText}
            onChange={handleSearch}
        />
    )

    const songTable = () => (
        <div className="table-scrollable">
            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col" className="text-capitalize">#</th>
                        <th scope="col" className="text-capitalize">Song Name</th>
                        <th scope="col" className="text-capitalize">Song description</th>
                        <th scope="col" className="text-capitalize">Length</th>
                        <th scope="col" className="text-capitalize">Artist</th>
                        <th scope="col" className="text-capitalize">Genre</th>
                        <th scope="col" className="text-capitalize">Mood</th>
                        <th scope="col" className="text-capitalize">File Url</th>
                        <th scope="col" className="text-capitalize">Thumnail Url</th>
                        <th scope="col" className="text-capitalize">actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchText && searchText.length
                            ? (
                                searchResult.length
                                    ? searchResult.map(TR)
                                    : <td className="text-grey" colSpan={6}><i class="fas fa-exclamation-triangle text-danger mr-2"></i> No Records Found</td>
                            )
                            : (
                                allSongs.length
                                    ? allSongs.map(TR)
                                    : <td className="text-grey" colSpan={6}><i class="fas fa-exclamation-triangle text-danger mr-2"></i> No Records Found</td>
                            )
                    }
                </tbody>
            </table>
        </div>
    )


    useEffect(() => {
        preload()
    }, [])

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


    return (
        <Layout title="Songs">
            {Search()}
            {message()}
            {songTable()}
        </Layout>
    );
}

export default Songs;