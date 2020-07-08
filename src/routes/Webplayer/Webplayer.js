import React, { useEffect } from 'react';
import Layout from '../../components/layouts/Webplayer/Layout';
import SongCard from '../../components/layouts/Webplayer/SongCard/SongCard';
import { getAllSongs } from '../../backend/helpers/song';
import notFound from '../../assets/images/404.svg';
import { useState } from 'react';
import { BACKEND } from '../../backend/api';
function Webplayer(props) {

	const [status, setStatus] = useState({
		error: false,
		success: false,
		msg: "",
	});

	const [allSongs, setAllSongs] = useState([]);

	const [queue, setQueue] = useState([]);

	const [currentSong, setCurrentSong] = useState(null);

	const preloadSongs = () => {

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
		<Layout title={"Web Player"} setCurrentSong={setCurrentSong} queue={queue} currentSong={currentSong}>
			<div className="row no-gutters">
				{
					allSongs.map(Songs)
				}
			</div>
		</Layout>
	);
}

export default Webplayer;