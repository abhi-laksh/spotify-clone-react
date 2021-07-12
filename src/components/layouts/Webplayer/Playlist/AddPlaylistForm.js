import React from 'react';
import { isAuthenticated } from '../../../../backend/helpers/auth';
import { addPlaylist, getPlaylistById, updatePlaylist } from '../../../../backend/helpers/user';
import AppModal from '../../../commons/AppModal';
import Input from '../../../commons/Input';

const AddPlaylistForm = ({ songIds = [], afterSubmit = () => { }, selectedId, ...props }) => {


    const [status, setStatus] = React.useState({
        error: false,
        success: false,
        msg: "",
    });


    // Input Values
    const [values, setValues] = React.useState({
        name: "",
    });

    const {
        name,
    } = values;

    // Handle Event on inputs
    const handleInputs = (name) => (e) => {
        const val = e.target.value;

        setValues({ ...values, [name]: val });
    }

    // Message Component
    const message = () => (
        (status.error && <p className="alert w-100 text-center alert-danger">{status.msg}</p>)
        || (status.success && <p className="alert w-100 text-center alert-success">{`${status.msg} !`}</p>)
        || (status.loading && <p className="alert w-100 text-center alert-warning">{status.msg}</p>)
    )


    // on submit button click
    const onSubmit = (e) => {

        e.preventDefault();

        const token = isAuthenticated() && isAuthenticated().user && isAuthenticated().token;

        if (selectedId) {

            updatePlaylist({
                name,
                id: selectedId,
            }, token).then((resp) => {
                if (resp) {
                    if (resp.error) {
                        setStatus({
                            error: true,
                            success: false,
                            msg: (resp && resp.error) || "There is an error."
                        })

                    } else {

                        setStatus({
                            error: false,
                            success: true,
                            msg: (resp && resp.msg) || "Playlist created!"
                        })

                        setValues({
                            name: ""
                        })

                        afterSubmit();
                    }
                }
            });

        } else {

            if (songIds.length > 0) {

                addPlaylist({
                    name,
                    songs: songIds
                }, token).then((resp) => {
                    if (resp) {
                        if (resp.error) {
                            setStatus({
                                error: true,
                                success: false,
                                msg: (resp && resp.error) || "There is an error."
                            })

                        } else {

                            setStatus({
                                error: false,
                                success: true,
                                msg: (resp && resp.msg) || "Playlist created!"
                            })

                            afterSubmit();
                        }
                    }
                });

            } else {

                addPlaylist({
                    name
                }, token).then((resp) => {
                    if (resp) {
                        if (resp.error) {
                            setStatus({
                                error: true,
                                success: false,
                                msg: (resp && resp.error) || "There is an error."
                            })

                        } else {

                            setStatus({
                                error: false,
                                success: true,
                                msg: (resp && resp.msg) || "Playlist created!"
                            })

                            setValues({
                                name: ""
                            })

                            afterSubmit();
                        }
                    }
                });

            }

        }


    }


    const addForm = () => (
        <form className="row form-common">
            {message()}
            <Input
                formClass="col-12"
                label="Enter Playlist Name:"
                type="name"
                id="name"
                name="name"
                placeholder="E.g :- myplaylist"
                value={name}
                onChange={handleInputs("name")}
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


    const getById = () => {
        const token = isAuthenticated() && isAuthenticated().user && isAuthenticated().token;

        setValues({
            name: ""
        })

        getPlaylistById(selectedId, token).then((resp) => {
            if (resp) {
                if (resp.error) {

                    setStatus({
                        error: true,
                        success: false,
                        msg: (resp && resp.error) || "There is an error."
                    })

                } else {

                    const { playlist = {} } = resp;

                    setValues({
                        name: playlist.name
                    });
                }
            }
        })
    }


    //auto remove msg
    React.useEffect(() => {
        (status.error || status.success) && setTimeout(() => {
            setStatus({
                error: false,
                success: false,
                msg: "",
            });
        }, 3000)
    }, [status.error, status.success])

    //auto remove msg
    React.useEffect(() => {
        if (selectedId) {
            getById()
        } else {
            setValues({
                name: ""
            })
        }
    }, [selectedId])


    return (
        <AppModal {...props}>
            {addForm()}
        </AppModal>
    )
}

export default AddPlaylistForm
