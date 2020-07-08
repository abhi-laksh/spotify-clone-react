import React from 'react';
import PropTypes from 'prop-types';

Table.propTypes = {
    theads:PropTypes.array,
};

function Table({
    theads = ["#", "First", "second", "third"],
    ...props
}) {


    const TH = (item, index) => (
        <th scope="col" className="text-capitalize" key={index}>{item}</th>
    )


    return (
        <div></div>
    );
}

export default Table;