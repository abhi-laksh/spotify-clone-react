import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

Input.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["text", "password", "checkbox", "email", "number", "radio"]),
    name: PropTypes.string,
    label: PropTypes.string,
    inputClass: PropTypes.string,
    formClass: PropTypes.string,
    labelClass: PropTypes.string,
    id: PropTypes.string
};


function Input({
    placeholder = "Enter Something:",
    type = "text",
    id = String(window.performance.now()),
    name = "name",
    label = "Enter Something",
    inputClass = "input input-border input-border-primary2",
    formClass = "",
    labelClass = "",
    onChange = () => { },
    value = "",
    ...props
}) {

    return (
        <div className={`form-group ${formClass}`}>
            <label htmlFor={id} className={`label ${labelClass}`}>{label}</label>
            <input
                placeholder={placeholder}
                value={value}
                type={type}
                id={id}
                name={name}
                className={inputClass}
                onChange={onChange}
                {...props}
            />
        </div>
    )
}

export default Input;