import { useEffect, useState } from "react";

export const getDurMin = ($sec) => {
    // if($sec.isNaN()){}
    var min = parseInt($sec / 60);
    var sec = parseInt($sec % 60);
    if (min < 10) {
        min = '0' + String(min);
    }
    if (sec < 10) {
        sec = '0' + String(sec);
    }
    return { min: min, sec: sec };
}

/* 
const useAudio = url => {

    const [audio] = useState(new Audio(url));

    // state for duration !! due to error !!
    const [duration, setDuration] = useState(0);

    // state for play ,pause
    const [playing, setPlaying] = useState(false);

    // state for volume
    const [volume, setVolume] = useState(100);

    // state for progress
    const [progress, setProgress] = useState(0);

    const toggle = () => setPlaying(!playing);
    const seekTo = (val) => {
        audio.currentTime = ((Number(val) / 100) * duration);
    };

    // all state of audio
    const audioState = {
        volume,
        progress,
        playing,
        duration,
    }
    // master update function with reducer logic
    const setAudioState = (action) => {
        switch (action.type) {
            case "volume":
                return setVolume(action.volume);
            case "progress":
                return seekTo(action.progress);
            case "toggle":
                return toggle();
            default:
                return () => { };
        }
    }

    // control pause/play
    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    // control volume
    useEffect(() => {
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
    },
        [volume]
    );

    // event handler to check if song has ended
    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    // manually listening to event for duration !! due to error !!
    useEffect(() => {

        audio.addEventListener('loadeddata', () => setDuration(audio.duration));
        return () => {
            audio.removeEventListener('loadeddata', () => { setDuration(0) });
        };

    }, []);

    // listening to timeupdate event to move progress bar
    useEffect(() => {
        audio.addEventListener('timeupdate', () => setProgress(((audio.currentTime / audio.duration))));
        return () => {
            audio.removeEventListener('timeupdate', () => { setProgress(0) });
        };

    }, []);

    return [audioState, setAudioState];
};
 */



 /* 
 
const useAudio = url => {

    const [audio] = useState(new Audio(url));

    function seekTo(val, duration, state) {
        audio.currentTime = ((Number(val) / 100) * duration);
        // return { ...state };
    };

    // master function with reducer logic
    const reducer = (state, action) => {
        switch (action.type) {
            case VOLUME:
                return { ...state, volume: action.volume };
            case PROGRESS:
                return { ...state, progress: action.progress };
            case SEEK:
                seekTo(action.progress, action.duration, state);
                return { ...state };
            case TOGGLE:
                return { ...state, playing: !(action.playing) };
            case LOOP:
                return { ...state, loop: !(action.loop) };
            case DURATION:
                return { ...state, duration: (action.duration) };
            default:
                return state;
        }
    }

    // all state of audio
    const [state, dispatch] = useReducer(reducer, {
        volume: 100,
        progress: 0,
        loop: false,
        playing: false,
        duration: 0,
    });


    useEffect(() => {
        // vol >= 100 or vol <= 0 then make it 100 or 0 

        // control pause/play
        state.playing ? audio.play() : audio.pause();

        // control loop
        audio.loop = state.loop;

        // control volume
        audio.volume = (
            (state.volume >= 100)
                ? 1
                : (
                    (state.volume <= 0)
                        ? 0
                        : (state.volume / 100)
                )
        );
    },
        [state.loop, state.playing, state.volume, state.progress]
    );

    // event handler to check if song has ended
    useEffect(() => {
        audio.addEventListener('ended', () => dispatch({ type: TOGGLE, playing: false }));
        return () => {
            audio.removeEventListener('ended', () => dispatch({ type: TOGGLE, playing: false }));
        };
    }, []);

    // manually listening to event for duration !! due to error !!
    useEffect(() => {

        audio.addEventListener('loadeddata', () => dispatch({ type: DURATION, duration: audio.duration }));
        return () => {
            audio.removeEventListener('loadeddata', () => dispatch({ type: DURATION, duration: 0 }));
        };

    }, []);

    // listening to timeupdate event to move progress bar
    useEffect(() => {
        audio.addEventListener('timeupdate', () => dispatch({ type: PROGRESS, progress: ((audio.currentTime / audio.duration)) }));
        return () => {
            audio.removeEventListener('timeupdate', () => dispatch({ type: PROGRESS, progress: 0 }));
        };
    }, []);

    return [state, dispatch];
};


 
 */