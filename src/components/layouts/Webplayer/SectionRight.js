import React from 'react';
import Topbar from './Topbar/Topbar';
import Player from './Footer/Player';

function SectionRight({ allSongs, currentSong, setCurrentSong = () => { }, queue, ...props }) {
    return (
        <section id="section-right" className="section-right">
            <Topbar />
            <div className="p-3 section-main bg-primary1">
                {props.children}
            </div>
            <Player setCurrentSong={setCurrentSong} queue={queue} currentSong={currentSong} />
        </section>
    );
}

export default SectionRight;