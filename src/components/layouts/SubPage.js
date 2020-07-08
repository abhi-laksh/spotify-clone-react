import React from 'react';
import Base from './Base';
import secBg from '../../assets/images/secBg.jpg'
function SubPage({ title, sectionClass = "section-common" ,...props }) {
    return (
        <Base>
            <section className="page-banner" style={{ backgroundImage: `url(${secBg})` }}>
                <div className="container">
                    <h2 className="page-title text-white text-capitalize">{title || "A Page"}</h2>
                </div>
            </section>
            <section className={sectionClass}>
                <div className="container">
                    {props.children}
                </div>
            </section>
        </Base>
    );
}

export default SubPage;