import React from 'react';
import Sidenav from './Sidenav';
import SectionRight from './SectionRight';
import secBg from '../../../assets/images/secBg.jpg';
function Layout({ title = "Title", titleClass="", queue, setCurrentSong = () => { }, currentSong, ...props }) {
    return (
        <section id="section-dashboard">
            <Sidenav />
            <SectionRight setCurrentSong={setCurrentSong} queue={queue} currentSong={currentSong}>
                <h1
                    className={`section-main-title text-white text-capitalize ${titleClass}`}
                    style={{
                        backgroundImage: `linear-gradient(30deg, rgb(0, 3, 15) 10%, transparent 100%), url(${secBg})`
                    }}
                >{title}</h1>
                {props.children}
            </SectionRight>
        </section>
    );
}

export default Layout;