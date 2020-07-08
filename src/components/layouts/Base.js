import React from 'react';
import Header from './Header';
import Footer from './Footer/Footer';

function Base(props) {
    return (
        <>
            <Header />
            {props.children || <h1 className="text-secondary2">HOME</h1> }
            <Footer />
        </>
    );
}
 
export default Base;