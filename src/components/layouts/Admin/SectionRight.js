import React from 'react';
import Topbar from './Topbar/Topbar';
import secBg from '../../../assets/images/secBg.jpg';

function SectionRight({ title, titleClass, ...props }) {
    return (
        <section id="section-right" className="section-right">
            <Topbar />
            <h1
                className={`section-main-title text-white text-capitalize ${titleClass}`}
                style={{
                    backgroundImage: `linear-gradient(30deg, rgb(0, 3, 15) 10%, transparent 100%), url(${secBg})`
                }}
            >{title}</h1>
            <div className="p-4 section-main bg-primary1">
                {props.children}
            </div>
        </section>
    );
}

export default SectionRight;