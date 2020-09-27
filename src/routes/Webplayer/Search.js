import React, { useEffect } from 'react';
import Layout from '../../components/layouts/Webplayer/Layout';
import SongCard from '../../components/layouts/Webplayer/SongCard/SongCard';
import { getAllSongs } from '../../backend/helpers/song';

import searchSVG from '../../assets/images/search.svg';
import { useState } from 'react';
import { BACKEND } from '../../backend/api';

function Search(props) {


    const [allSongs, setAllSongs] = useState([]);

    const [queue, setQueue] = useState([]);

    const [currentSong, setCurrentSong] = useState(null);

    const [searchText, setSearchText] = useState("");

    const searchResult = searchText && allSongs.filter((each) => {
        return (
            (each.song_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
            || (each.artist_name && each.artist_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
            || (each.mood_name && each.mood_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
            || (each.genre_name && each.genre_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
        )
    });

    const preloadSongs = () => {

        getAllSongs().then((resp) => {
            if (!resp || resp.songs) {
                setAllSongs(resp.songs);
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
            key={item.id}
            title={item.song_name}
            artist={item.artist_name}
            genre={item.genre_name}
            mood={item.mood_name}
            artist={item.artist_name}
            thumbail={item.thumbnail ? `${BACKEND}/${item.thumbnail}` : null}
            // thumbail={item.thumbnail ? `${BACKEND}/${item.thumbnail}` : null}
            isPlaying={currentSong === item.id}
            onClick={playThisSong(item.id)}
        />
    )

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    console.log('====================================');
    console.log("allSongs::", allSongs);
    console.log('====================================');

    console.log('====================================');
    console.log("searchText::", searchText);
    console.log('====================================');
    
    
    useEffect(() => {
        console.log('====================================');
        console.log("RERENDER");
        console.log('====================================');
        preloadSongs();
    }, []);

    return (
        <Layout titleClass={"d-none"} title={"Search"} setCurrentSong={setCurrentSong} queue={queue} currentSong={currentSong}>
            <input
                type="text"
                className="input input-primary2 border py-3 border-primary1"
                placeholder="Search Songs, Artist, Mood, Genre"
                value={searchText}
                onChange={handleSearch}
            />
            <div className="row no-gutters">
                {
                    (searchResult && searchResult.length)
                        ? (
                            searchResult.map(Songs)
                        ) : (
                            <div className="col-12 text-white">
                                <img src={searchSVG} alt="Snngs not Found" className="notFound" />
                            </div>
                        )
                }
            </div>
        </Layout>
    );
}

export default Search;