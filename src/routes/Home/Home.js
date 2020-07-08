import React from 'react';
import Base from '../../components/layouts/Base';
import Banner from './Banner';
import SongSection from './SongSection';

function Home(props) {
    return (
 
        <Base>
            <Banner />
            <SongSection />
        </Base>
    );
}

export default Home;