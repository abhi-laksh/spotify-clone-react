import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';


import Input from '../components/commons/Input';
import InputFile from '../components/commons/InputFile';

import SubPage from '../components/layouts/SubPage';
import SideMenu from '../components/layouts/Account/SideMenu';
import EditForm from '../components/layouts/Account/EditForm';
import { getProfile, editProfile } from '../backend/helpers/user';
import { isAuthenticated, signOut } from '../backend/helpers/auth';
import { BACKEND } from '../backend/api';

import userDefault from '../assets/images/user.svg';



function Account(props) {

    const [userImg, setuserImg] = useState(null)

    // Set Status of form
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: false,
        refresh: false,
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



    const performRedirect = () => (
        status.refresh && (<Redirect to="/" />)
    )

    const message = () => (
        (status.error && <p className="alert w-100 text-center alert-danger">{status.msg}</p>)
        || (status.success && <p className="alert w-100 text-center alert-success">{`${status.msg}! Redirecting to home`}</p>)
        || (status.loading && <p className="alert w-100 text-center alert-warning">{status.msg}</p>)
    )

    // Preload user data
    const preloadData = () => {
        const token = isAuthenticated() && isAuthenticated().token;

        getProfile(token).then((resp) => {
            if (resp.error) {
            } else {

                setValues({
                    ...values,
                    name: resp.user.name,
                    email: resp.user.email,
                    password: resp.user.password,
                    number: resp.user.number,
                    gender: resp.user.gender,
                });
                resp.user.path && setuserImg(`${BACKEND}/${resp.user.path}`);
            }
        }).catch((e) => {
            console.log(e);
        });
    }



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

    const editForm = () => (
        <form className="form-row">
            {message()}
            <Input
                label="What's your name?"
                placeholder="E.g :- John Doe"
                type="text"
                id="name"
                name="name"
                formClass="col-sm-6"
                value={name}
                onChange={handleInputs("name")}
                key={"name"}
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
                defaultImg={userDefault}
                preiviewImg={
                    formData && ((formData.get("user_img")) && URL.createObjectURL((formData.get("user_img"))))
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

        preloadData();

        status.success && setTimeout(() => {
            setStatus({
                ...status,
                loading: false,
                success: false,
                error: false,
                refresh: true,
                msg: ""
            });
            setValues({
                name: "",
                email: "",
                password: "",
                number: "",
                gender: "",
                formData: (new FormData()),
            });
        }, 2000);


    }, [userImg, status.success])

    return (
        <SubPage title="Account Page" sectionClass="">
            <div className="row no-gutters">
                <div className="col-3">
                    <SideMenu userImg={userImg} />
                </div>
                <div className="col-9">
                    <div className="section-account-content">
                        <h3>Edit Profile</h3>
                        {editForm()}
                        {performRedirect()}
                        {/* <EditForm userData={userData} userImg={userImg} /> */}
                    </div>
                </div>
            </div>
        </SubPage>
    );
}

export default Account;