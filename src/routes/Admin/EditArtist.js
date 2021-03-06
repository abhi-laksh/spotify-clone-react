import React, { useState, useEffect } from 'react';
import Input from '../../components/commons/Input';
import Layout from '../../components/layouts/Admin/Layout';
import { Redirect, Link } from 'react-router-dom';

import { getArtistbyId, updateArtist } from '../../backend/helpers/artist';
import { isAuthenticated } from '../../backend/helpers/auth';

function EditArtist({ match, ...props }) {

    // get params from url : artistId
    const { params } = match;

    // Set Status of form
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: false,
        redirect: false,
        msg: ""
    });

    const [values, setValues] = useState({
        name: "",
        description: ""
    })

    const { name, description } = values;

    // preload data from id
    const preload = () => {
        getArtistbyId(params.artistId).then((resp) => {
            if (!resp || resp.error) {
                setStatus({
                    error: true,
                    success: false,
                    msg: (resp && resp.error) || "There is an error."
                })
            } else {
                setValues({
                    ...values,
                    name: resp.artist.name,
                    description: resp.artist.description,
                });
            }
        })
    }


    // Message Component
    const message = () => (
        (status.error && <p className="alert w-100 text-center alert-danger">{status.msg}</p>)
        || (status.success && <p className="alert w-100 text-center alert-success">{`${status.msg} ! Redirecting...`}</p>)
        || (status.loading && <p className="alert w-100 text-center alert-warning">{status.msg}</p>)
    )

    // Handle Event on inputs
    const handleInputs = (name) => (e) => {
        const val = e.target.value;
        setValues({ ...values, [name]: val });
    }

    // Redirect when stuffs are done.
    const performRedirect = () => (
        status.redirect && (<Redirect to="/admin/artists" />)
    )

    // on submit button click
    const onSubmit = (e) => {
        e.preventDefault();
        setStatus({ ...status, loading: true, msg: "Submitting..." });
        let token = isAuthenticated() && isAuthenticated().token;
        updateArtist({
            id: params.artistId,
            ...values
        }, token).then((resp) => {
            if (!resp || resp.error) {
                setStatus({
                    ...status,
                    msg: resp.error,
                    error: true,
                    loading: false,
                    success: false
                });
            } else {
                setStatus({
                    ...status,
                    success: true,
                    msg: resp.msg,
                    error: false,
                    loading: false
                });
                setValues({
                    ...values,
                    email: "",
                    password: ""
                });
            }
        });
    }

    //  Go back to all artist page
    const goBack = () => (
        <Link to="/admin/artists" className="text-white button d-block text-center button-secondary1 w-100 py-2 mt-3">
            Go Back
        </Link>
    )


    const form = () => (
        <form className="row form-common">
            {message()}
            <Input
                id="name"
                name="name"
                label="Enter artist name"
                labelClass={"text-grey"}
                formClass="col-12"
                placeholder="E.g :- Kishore Kumar"
                value={name}
                onChange={handleInputs("name")}
                inputClass="input input-primary2"
            />
            <Input
                id="description"
                name="description"
                label="Enter artist description"
                formClass="col-12"
                labelClass={"text-grey"}
                placeholder="E.g :- Kishore Kumar is awesome singer"
                value={description}
                onChange={handleInputs("description")}
                inputClass="input input-primary2"
            />
            <div className="col-6">
                <button
                    type="button"
                    className="text-white button button-secondary1 w-100 py-2 mt-3"
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </div>
            <div className="col-6">
                {goBack()}
            </div>
        </form>
    )

    useEffect(() => {
        preload()
    }, [])

    // If success, trigger redirect after 2 sec, (just to look cool).
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
    }, [status.success]);

    return (
        <Layout title="Edit Artist">
            {form()}
            {performRedirect()}
        </Layout>
    );
}

export default EditArtist;