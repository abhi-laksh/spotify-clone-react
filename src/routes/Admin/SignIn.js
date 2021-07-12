import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { authenticate, signIn } from '../../backend/helpers/admin';
import Input from '../../components/commons/Input';
import SubPage from '../../components/layouts/SubPage';


function SignIn(props) {

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
        email: "",
        password: "",
    });

    // Destructuring Values
    const {
        email,
        password,
    } = values;

    // Message Component
    const message = () => (
        (status.error && <p className="alert w-100 text-center alert-danger">{status.msg}</p>)
        || (status.success && <p className="alert w-100 text-center alert-success">{`${status.msg} ! Redirecting to home`}</p>)
        || (status.loading && <p className="alert w-100 text-center alert-warning">{status.msg}</p>)
    )

    // Handle Event on inputs
    const handleInputs = (name) => (e) => {
        const val = e.target.value;

        setValues({ ...values, [name]: val });
    }

    // Redirect when stuffs are done.
    const performRedirect = () => (
        status.redirect && (<Redirect to="/admin" />)
    )

    // on submit button click
    const onSubmit = (e) => {
        e.preventDefault();
        setStatus({ ...status, loading: true, msg: "Signing you in... please wait" });
        signIn({ email, password })
            .then((resp) => {
                if (!resp || resp.error) {
                    setStatus({ ...status, msg: resp.error, error: true, loading: false, success: false });
                } else {
                    authenticate(resp.data,()=>{
                        setStatus({ ...status, success: true, msg: resp.msg, error: false, loading: false })
                        setValues({
                            ...values,
                            email: "",
                            password: "",
                        });
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
    }

    // You know what it is, right?
    const signInForm = () => (
        <form className="row form-common">
            {message()}
            <Input
                formClass="col-12"
                label="Enter Email:"
                type="email"
                id="email"
                name="email"
                placeholder="E.g :- john@example.com"
                value={email}
                onChange={handleInputs("email")}
            />
            <Input
                formClass="col-12"
                label="Enter Password:"
                type="password"
                id="password"
                name="password"
                placeholder="x x x x x x x x"
                value={password}
                onChange={handleInputs("password")}
            />

            <button
                type="button"
                className="text-white button button-primary2 w-100 py-2 mt-3 mx-3"
                onClick={onSubmit}
            >
                Submit
            </button>
        </form>
    );

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
    }, [status.success])

    return (
        <SubPage title="Hey Admin, Sign In.">
            {performRedirect()}
            {signInForm()}
        </SubPage>
    );
}

export default SignIn;