import React, { useState } from 'react';
import PropTypes from 'prop-types';
import default_img from '../../assets/images/default_img.svg';

InputFile.propTypes = {
    type: PropTypes.oneOf(["file"]),
    name: PropTypes.string,
    label: PropTypes.string,
    inputClass: PropTypes.string,
    formClass: PropTypes.string,
    labelClass: PropTypes.string,
    id: PropTypes.string
};


function InputFile({
    type = "file",
    id = String(window.performance.now()),
    name = "name",
    label = "Choose File",
    inputClass = "",
    formClass = "",
    labelClass = "",
    titleClass = "",
    isImage = false,
    defaultImg = null,
    preiviewImg = null,
    preiviewFile = null,
    onChange = () => { },
    ...props
}) {

    // const [file, setFile] = useState({ preview: null, data: null });


    // const onImageChange = (e) => {
    //     if ((e.target.files) && (e.target.files[0])) {
    //         setFile({
    //             preview: URL.createObjectURL(e.target.files[0]),
    //             data: e.target.files[0]
    //         });
    //     }
    // }

    return (
        <div className={`form-group ${formClass}`}>
            <div className={isImage ? "form-file-input" : "d-block"}>
                {isImage
                    ? (
                        <>
                            <div className={`form-file-input-display border border-secondary2 default ${defaultImg || preiviewImg ? "d-none" : ""}`}>
                                <img src={default_img} alt="" />
                            </div>
                            <div className={`form-file-input-display border border-secondary2 ${!defaultImg && !preiviewImg ? "d-none" : ""}`}>
                                <img src={(preiviewImg) || defaultImg || default_img} alt="" />
                            </div>
                        </>
                    )
                    : (
                        <p className={`form-file-input-title ${titleClass}`}>{preiviewFile || "No File"}</p>
                    )
                }
                <label
                    htmlFor={id}
                    className={`button text-center label-file button-primary2 ${labelClass} ${!isImage && "d-block"}`}
                    style={{
                        flex: "1 1 auto"
                    }}
                >
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    className={`d-none ${inputClass}`}
                    {...props}
                    onChange={onChange}
                />
            </div>
        </div >
    );
}

export default InputFile;