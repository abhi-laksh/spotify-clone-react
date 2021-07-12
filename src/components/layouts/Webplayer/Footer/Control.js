import React, { useEffect, useRef, useState } from 'react';
import pauseIcon from '../../../../assets/images/pause.svg';
import playIcon from '../../../../assets/images/play.svg';
import { STREAM } from '../../../../backend/api';
import Slider from '../../../commons/Slider';
import { getDurMin } from '../../../helpers/audio';




const TOGGLE = "toggle";
const PROGRESS = "progress";
const SEEK = "seek";
const VOLUME = "volume";
const LOOP = "loop";
const DURATION = "duration";


const useAudio = (audioElem) => {
    /* 
    Using seperate state due to performance...
    */

    // let a = new Audio();

    const [audio, setAudioRef] = useState(null);

    // state for duration !! due to error !!
    const [duration, setDuration] = useState(0);

    // state for play ,pause
    const [playing, setPlaying] = useState(false);

    // state for loop
    const [loop, setLoop] = useState(false);

    // state for volume
    const [volume, setVolume] = useState(100);

    // state for progress
    const [progress, setProgress] = useState(0);


    const togglePlay = () => setPlaying(!playing);
    const toggleLoop = () => setLoop(!loop);

    const seekTo = (val) => {
        if (audio) {
            audio.currentTime = (((Number(val) / 100) * audio.duration));
        }
    };

    // all state of audio

    const audioState = {
        volume,
        progress,
        playing,
        loop,
        duration,
    }

    // master update function with reducer logic

    const setAudioState = (action) => {
        switch (action.type) {
            case VOLUME:
                return setVolume(action.volume);
            case PROGRESS:
                return seekTo(action.progress);
            case TOGGLE:
                return togglePlay();
            case LOOP:
                return toggleLoop();
            default:
                return () => { };
        }
    }

    /* 
        Different useEffect due to update issues.
    */

    useEffect(() => {
        audioElem && audioElem.current && setAudioRef(audioElem.current);
    }, [audioElem])

    // control loop

    useEffect(() => {
        if (audio) {
            audio.loop = loop;
        }
    },
        [loop]
    );

    // control pause/play

    useEffect(() => {
        if (audio) {
            playing ? audio.play() : audio.pause();
        }
    },
        [playing]
    );

    // control volume

    useEffect(() => {
        if (audio) {
            // vol >= 100 or vol <= 0 then make it 100 or 0 
            audio.volume = (
                (volume >= 100)
                    ? 1
                    : (
                        (volume <= 0)
                            ? 0
                            : (volume / 100)
                    )
            );
        }
    },
        [volume]
    );

    // ---------------------------------

    useEffect(() => {

        if (audio !== null) {
            audio && audio.addEventListener('play', () => setPlaying(true));
        };

        return () => {
            if (audio !== null) {
                audio.removeEventListener('play', () => setPlaying(true));
            };
        };
    }, [audio]);



    // ---------------------------------

    // event handler to check if song has ended

    useEffect(() => {

        if (audio !== null) {
            audio && audio.addEventListener('play', () => setPlaying(true));
        };

        return () => {
            if (audio !== null) {
                audio.removeEventListener('play', () => setPlaying(true));
            };
        };
    }, [audio]);

    // event handler to check if song has ended

    useEffect(() => {

        if (audio !== null) {
            audio && audio.addEventListener('ended', () => setPlaying(false));
        };
        return () => {
            if (audio !== null) {
                audio.removeEventListener('ended', () => setPlaying(false));
            };
        };
    }, [audio]);

    // manually listening to event for duration !! due to error !!

    useEffect(() => {
        if (audio !== null) {
            audio.addEventListener("loadedmetadata", () => { setDuration(audio.duration) });
        };
        return () => {
            if (audio !== null) {
                audio.removeEventListener('loadedmetadata', () => { setDuration(0) });
            };
        };

    }, [audio]);

    // listening to timeupdate event to move progress bar

    useEffect(() => {

        if (audio !== null) {
            audio.addEventListener('timeupdate', () => setProgress(((audio.currentTime / audio.duration))));
        };

        return () => {
            if (audio !== null) {
                audio.removeEventListener('timeupdate', () => { setProgress(0) });
            };
        };
    }, [audio]);

    return [audioState, setAudioState];
};

function Control({ songId, queue, setCurrentSong = () => { }, length, ...props }) {

    const audioRef = useRef(null);

    const [audioState, setAudioState] = useAudio(audioRef);

    const [prevSong, setPrevSong] = useState(null);

    const [nextSong, setNextSong] = useState(null);

    // convert into MM:SS
    const { min, sec } = getDurMin((audioState.progress * audioState.duration));

    // actions

    const switchToPrev = () => {
        setCurrentSong(prevSong);
    }

    const switchToNext = () => {
        setCurrentSong(nextSong);
    }


    const togglePlay = () => {
        setAudioState({ type: TOGGLE });
    }

    const toggleVolume = () => {
        setAudioState({ type: VOLUME, volume: (audioState.volume > 0 ? 0 : 100) });
    }

    const toggleLoop = () => {
        setAudioState({ type: LOOP });
    }

    const setVolume = (e) => {
        setAudioState({ type: VOLUME, volume: (e.target.value) })
    }

    const seekTo = (e) => {
        setAudioState({ type: PROGRESS, progress: (e.target.value) })
    }

    useEffect(() => {
        if (queue && queue.length > 1) {

            let pos = queue.indexOf(songId);

            if (pos <= 0) {
                setPrevSong(null);
                setNextSong(queue[pos + 1]);
            } else if (pos >= (queue.length - 1)) {
                setPrevSong(queue[pos - 1]);
                setNextSong(null);
            } else {
                setPrevSong(queue[pos - 1]);
                setNextSong(queue[pos + 1]);
            }

        }

    }, [queue, songId]);

    return (
        <div className="player-controls">
            <div className="player-controls-btns">
                <button id="repeat" className={`player-controls-btn${audioState.loop ? ' loop' : ''}`} onClick={toggleLoop}>
                    <i className="fas fa-retweet"></i>
                </button>
                <button
                    title={!songId ? "No song is selected!" : null}
                    disabled={!prevSong || !songId}
                    id="prev"
                    className="player-controls-btn"
                    onClick={switchToPrev}
                >
                    <i className="fas fa-backward"></i>
                </button>
                <button
                    title={!songId ? "No song is selected!" : null}
                    disabled={!songId}
                    id="play"
                    className="player-controls-btn"
                    onClick={togglePlay}
                >
                    <img src={audioState.playing ? pauseIcon : playIcon} alt="" />
                </button>
                <button
                    title={!songId ? "No song is selected!" : null}
                    disabled={!nextSong || !songId}
                    id="next"
                    className="player-controls-btn"
                    onClick={switchToNext}
                >
                    <i className="fas fa-forward"></i>
                </button>
                <div className="player-controls-volume">
                    <button
                        id="player-controls-volume-icon"
                        className="player-controls-btn"
                        onClick={toggleVolume}
                    >
                        {
                            !(audioState.volume <= 0)
                                ? (<i className="fas fa-volume-up"></i>)
                                : (<i className="fas fa-volume-off"></i>)
                        }
                    </button>
                    <Slider
                        value={audioState.volume}
                        onChange={setVolume}
                    />
                </div>
            </div>

            <div className="player-controls-progress">
                <span className="text-grey mx-3" id="startTime">{
                    (isNaN(min) || isNaN(sec)) ? "00:00" : (`${min}:${sec}`)
                }</span>
                <Slider
                    parentStyle={{
                        width: "360px"
                    }}
                    value={(isNaN(audioState.progress) ? 0 : (audioState.progress * 100))}
                    onChange={seekTo}
                    disabled={!songId}

                />
                <span className="text-grey mx-3" id="endTime">{length}</span>
                <audio src={songId ? `${STREAM}?song=${songId}` : null} autoPlay ref={audioRef} className="d-none"></audio>
            </div>
        </div >
    );
}

export default Control;

/*


    // convert into MM:SS
    const { min, sec } = getDurMin((audioState.progress * audioState.duration));

    // actions
    const togglePlay = () => {
        setAudioState({ type: TOGGLE, playing: audioState.playing }, audioState);
    }

    const toggleVolume = () => {
        setAudioState({ type: VOLUME, volume: (audioState.volume > 0 ? 0 : 100) }, audioState);
    }

    const toggleLoop = () => {
        setAudioState({ type: LOOP, playing: audioState.loop }, audioState);
    }

    const setVolume = (e) => {
        setAudioState({ type: VOLUME, volume: (e.target.value) }, audioState)
    }

    const seekTo = (e) => {
        setAudioState({ type: SEEK, progress: (e.target.value), duration: audioState.duration }, audioState)
    }


    return (
        <div className="player-controls">
            <div className="player-controls-btns">
                <button id="repeat" className="player-controls-btn looped" onClick={toggleLoop}>
                    <i className="fas fa-retweet"></i>
                </button>
                <button id="prev" className="player-controls-btn disabled">
                    <i className="fas fa-backward"></i>
                </button>
                <button id="play" className="player-controls-btn" onClick={togglePlay}>
                    <img src={audioState.playing ? pauseIcon : playIcon} alt="" />
                </button>
                <button id="next" className="player-controls-btn">
                    <i className="fas fa-forward"></i>
                </button>
                <div className="player-controls-volume">
                    <button
                        id="player-controls-volume-icon"
                        className="player-controls-btn"
                        onClick={toggleVolume}
                    >
                        {
                            !(audioState.volume <= 0)
                                ? (<i className="fas fa-volume-up"></i>)
                                : (<i className="fas fa-volume-off"></i>)
                        }
                    </button>
                    <Slider
                        value={audioState.volume}
                        onChange={setVolume}
                    />
                </div>
            </div>

            <div className="player-controls-progress">
                <span className="text-grey mx-3" id="startTime">{`${min}:${sec}`}</span>
                <Slider
                    parentStyle={{
                        width: "360px"
                    }}
                    value={(audioState.progress * 100)}
                    onChange={seekTo}
                />
                <span className="text-grey mx-3" id="endTime">04 : 32</span>
            </div>
        </div>
    );

*/