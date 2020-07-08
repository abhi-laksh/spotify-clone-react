import React, { useState } from 'react';
import PropTypes from 'prop-types';

Slider.propTypes = {
    disabled: PropTypes.bool,
    defaultValue: PropTypes.number
};

function Slider({ value = 0, onChange, parentStyle, disabled = false, ...props }) {

    return (
        <div className="input-range-main" style={parentStyle}>
            <input onChange={onChange} value={value} disabled={disabled} className="input-range d-block" type="range" min={0} max={100} />
            <span style={{ width: !disabled ? `calc(${value}% + 1px)` : 0 }} className="input-range-progress bg-secondary2"></span>
        </div>
    )
}

export default Slider;