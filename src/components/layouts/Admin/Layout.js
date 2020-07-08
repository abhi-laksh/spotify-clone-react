import React from 'react';
import Sidenav from './Sidenav';
import SectionRight from './SectionRight';
import secBg from '../../../assets/images/secBg.jpg';
function Layout({ title = "Title", titleClass, ...props }) {
    return (
        <section id="section-dashboard">
            <Sidenav />
            <SectionRight title={title} titleClass={titleClass}>
                {props.children}
            </SectionRight>
        </section>
    );
}

export default Layout;