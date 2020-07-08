import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import Base from '../components/layouts/Base';
import SubPage from '../components/layouts/SubPage';
import Input from '../components/commons/Input';
import InputFile from '../components/commons/InputFile';
import { signUp } from '../backend/helpers/auth';

function SignUp(props) {

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
        formData
    } = values;

    const message = () => (
        (status.error && <p className="alert w-100 text-center alert-danger">{status.msg}</p>)
        || (status.success && <p className="alert w-100 text-center alert-success">{`${status.msg} ! Redirecting to home`}</p>)
        || (status.loading && <p className="alert w-100 text-center alert-warning">{status.msg}</p>)
    )

    const performRedirect = () => (
        status.redirect && (<Redirect to="/" />)
    )

    const handleInputs = (name) => (e) => {

        const val = name === "user_img" ? e.target.files[0] : e.target.value;

        formData.set(name, val);

        setValues({ ...values, [name]: val });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus({ ...status, loading: true, msg: "Submitting form... please wait" });

        signUp(formData)
            .then((resp) => {
                if (!resp || resp.error) {
                    setStatus({ ...status, msg: resp.error, error: true, loading: false, success: false });
                } else {
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

    const signUpForm = () => (
        <form className="row form-common">
            {message()}
            <div className="form-group col-sm-6">
                <label htmlFor="name" className="label">What's your name?</label>
                <input
                    placeholder="E.g :- John Doe"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleInputs("name")}
                    className="input input-border input-border-primary2"
                />
            </div>
            <div className="form-group col-sm-6">
                <label htmlFor="number" className="label">What's your number?</label>
                <input
                    placeholder="E.g :- 9876543210"
                    type="number"
                    id="number"
                    name="number"
                    value={number}
                    onChange={handleInputs("number")}
                    className="input input-border input-border-primary2"
                />
            </div>
            <div className="form-group col-sm-6">
                <label htmlFor="email" className="label">What's your email?</label>
                <input
                    placeholder="E.g :- john@example.com"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInputs("email")}
                    className="input input-border input-border-primary2"
                />
            </div>
            <div className="form-group col-sm-6">
                <label htmlFor="password" className="label">Set your password:</label>
                <input
                    placeholder="x x x x x x x x"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleInputs("password")}
                    className="input input-border input-border-primary2"
                />
            </div>
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
                >
                    <option value="null">
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
                    (formData.get("user_img")) && URL.createObjectURL((formData.get("user_img")))
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
    )


    useEffect(() => {
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
    }, [status.success])

    return (
        <SubPage title={"Sign Up"}>
            {signUpForm()}
            {performRedirect()}
        </SubPage>
    );
}

export default SignUp;


/*


*/