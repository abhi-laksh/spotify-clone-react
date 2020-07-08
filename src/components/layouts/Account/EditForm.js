import React, { useState, useEffect } from 'react';
import Input from '../../commons/Input';
import InputFile from '../../commons/InputFile';
import { editProfile, getProfile } from '../../../backend/helpers/user';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../../backend/helpers/auth';

function EditForm({ userImg, userData, ...props }) {

    // Set Status of form
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: false,
        redirect: false,
        msg: ""
    });

    // Input Values
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        number: "",
        gender: "",
        formData: (new FormData()),
    });

    // Destructuring Values
    const {
        name,
        email,
        password,
        number,
        formData,
        gender
    } = values;

    const message = () => (
        (status.error && <p className="alert w-100 text-center alert-danger">{status.msg}</p>)
        || (status.success && <p className="alert w-100 text-center alert-success">{`${status.msg} ! Redirecting to home`}</p>)
        || (status.loading && <p className="alert w-100 text-center alert-warning">{status.msg}</p>)
    )

    const preload = (img, data) => {

        data && setValues({
            ...values,
            name: data.name,
            email: data.email,
            password: data.password,
            number: data.number,
            gender: data.gender,
        });
    }

    const performRedirect = () => (
        status.redirect && (<Redirect to="/" />)
    )

    const handleInputs = (name) => {
        
        if (values[name]) {
            formData.set(name, values[name]);
        }

        return (e) => {

            const val = name === "user_img" ? e.target.files[0] : e.target.value;

            formData.set(name, val);

            setValues({ ...values, [name]: val });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setStatus({ ...status, loading: true, msg: "Submitting form... please wait" });

        let token = isAuthenticated() && isAuthenticated().token;

        editProfile(formData, token)
            .then((resp) => {

                if (!resp || resp.error) {
                    setStatus({ ...status, msg: resp.error, error: true, loading: false, success: false });
                }
                else {

                    setStatus({ ...status, success: true, msg: resp.msg, error: false, loading: false })

                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        number: "",
                        gender: "",
                        formData: (new FormData()),
                    });

                }
            }).catch((e) => {
                console.log(e);
            });

    }

    useEffect(() => {

        preload(userImg, userData);

        status.success && setTimeout(() => (
            setStatus({
                ...status,
                loading: false,
                success: false,
                error: false,
                redirect: true,
                msg: ""
            })
        ), 2000);

    }, [])
    // userData, userImg, status.success
    return (
        <form className="form-row">
            {message()}
            {performRedirect()}
            <input type="text" />
            <Input
                label="What's your name?"
                placeholder="E.g :- John Doe"
                type="text"
                id="name"
                name="name"
                formClass="col-sm-6"
                value={name}
                onChange={handleInputs("name")}

            />
            <Input
                label="What's your number?"
                placeholder="E.g :- 9876543210"
                type="number"
                id="number"
                name="number"
                formClass="col-sm-6"
                value={number}
                onChange={handleInputs("number")}
            />
            <Input
                label="What's your email?"
                placeholder="E.g :- john@example.com"
                type="email"
                id="email"
                name="email"
                formClass="col-sm-6"
                value={email}
                onChange={handleInputs("email")}
            />
            <Input
                label="Your Password"
                placeholder="x x x x x x x x"
                type="password"
                id="password"
                name="password"
                formClass="col-sm-6"
                value={password}
                onChange={handleInputs("password")}
            />
            <div className="form-group col-sm-6">
                <label
                    htmlFor="gender"
                    className="label"
                >
                    Choose Gender:
                </label>
                <select
                    name="gender"
                    id="gender"
                    className="input input-border input-border-primary2"
                    onChange={handleInputs("gender")}
                    value={gender}
                >
                    <option value="null" disabled>
                        -- Select Gender --
                    </option>
                    <option value="Male">
                        Male
                    </option>
                    <option value="Female">
                        Female
                    </option>
                </select>
            </div>

            <InputFile
                id="user_img"
                name="user_img"
                label="Choose Profile Image"
                formClass="col-sm-6"
                onChange={handleInputs("user_img")}
                isImage
                preiviewImg={
                    ((formData.get("user_img")) && URL.createObjectURL((formData.get("user_img"))))
                }
            />
            <button
                type="button"
                className=" text-white button button-primary2 w-100 py-2 mt-3 mx-3"
                onClick={onSubmit}
            >
                Submit
            </button>
        </form>
    );
}

export default EditForm;