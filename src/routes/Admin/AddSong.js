import React, { useState, useEffect } from 'react';
import Input from '../../components/commons/Input';
import Layout from '../../components/layouts/Admin/Layout';
import { Redirect } from 'react-router-dom';

import { getAllArtists } from '../../backend/helpers/artist';
import { isAuthenticated } from '../../backend/helpers/auth';
import InputFile from '../../components/commons/InputFile';
import { getAllMoods } from '../../backend/helpers/mood';
import { getAllGenres } from '../../backend/helpers/genre';
import { createSong } from '../../backend/helpers/song';
import { getDurMin } from '../../components/helpers/audio';

function AddSong(props) {

    // Set Status of form
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: false,
        redirect: false,
        msg: ""
    });



    // preloads - artists, genres, moods
    const [preloadedData, setPreloadedData] = useState({
        artists: [],
        genres: [],
        moods: [],
    });

    // inputs
    const [values, setValues] = useState({
        name: "",
        description: "",
        length: "",
        artist_id: "",
        genre_id: "",
        mood_id: "",
        song_file: "",
        thumbnail: "",
        formData: new FormData()
    })

    const {
        name,
        description,
        length,
        artist_id,
        genre_id,
        mood_id,
        song_file,
        thumbnail,
        formData
    } = values;


    // preload function
    const preload = async () => {
        const artists = await getAllArtists();
        const moods = await getAllMoods();
        const genres = await getAllGenres();

        if (
            ((artists.error) || (moods.error) || (genres.error))
        ) {
            setStatus({
                ...status,
                msg: (((artists.error) || (moods.error) || (genres.error))),
                error: true,
                loading: false,
                success: false
            });
        } else {
            setPreloadedData({
                ...preloadedData,
                artists: artists.artists,
                moods: moods.moods,
                genres: genres.genres,
            })
        }
    }

    // Render Option for preloads -- performance enhance (same for all three)
    const Option = (item, index) => (
        <option value={item.id} key={item.id}>{item.name}</option>
    )

    // Message Component
    const message = () => (
        (status.error && <p className="alert w-100 text-center alert-danger">{status.msg}</p>)
        || (status.success && <p className="alert w-100 text-center alert-success">{`${status.msg} ! Redirecting...`}</p>)
        || (status.loading && <p className="alert w-100 text-center alert-warning">{status.msg}</p>)
    )

    // get duration in sec
    const fetchDuration = (audioFile) => {
        return new Promise((resolve, reject) => {
            const reader = new Audio();
            // size in bytes max 7mb = 7340032
            if (audioFile.size > 7340032) {
                reject("Audio files size must not exceed 7 MB");

            }

            reader.src = URL.createObjectURL(audioFile);

            reader.onloadedmetadata = () => {
                let duration = reader.duration;
                if (reader.duration > 3599) {
                    reject("Audio files must not exceed 59 min and 59 sec");
                } else {
                    URL.revokeObjectURL(reader.src);
                    resolve(duration)
                }
            };
        })

    }

    // Handle Event on inputs
    const handleInputs = (name) => (e) => {

        const val = (name === "song_file" || name === "thumbnail") ? e.target.files[0] : e.target.value;

        if ((name === "song_file")) {
            // gets undefined when user press cancel while choosing the file
            if (val) {
                fetchDuration(val).then((duration) => {

                    let { min, sec } = getDurMin(duration);

                    formData.set(name, val);

                    formData.set("length", `${min}:${sec}`);

                    setValues({ ...values, [name]: (val.name), length: `${min}:${sec}` });

                }).catch((err) => {
                    setStatus({
                        ...status,
                        error: true,
                        msg: err
                    });
                });

            } else {
                formData.set(name, val);
                formData.set("length", null);
                setValues({ ...values, song_file: null, length: "" });
            }
        } else if (name === "thumbnail") {
            // gets undefined when user press cancel while choosing the file

            if (val && val.size > 51200) {
                formData.set(name, null);
                setValues({ ...values, thumbnail: null });
                setStatus({
                    ...status,
                    error: true,
                    msg: "thumbnail size cannot exceed 50 KB"
                });
                return;
            }

            formData.set(name, val);

            if (val) {
                setValues({ ...values, thumbnail: URL.createObjectURL(val) });
            } else {
                URL.revokeObjectURL(thumbnail);
                setValues({ ...values, thumbnail: null });
            }

        } else {
            formData.set(name, val);
            setValues({ ...values, [name]: val });
        }

    }

    // Redirect when stuffs are done.
    const performRedirect = () => (
        status.redirect && (<Redirect to="/admin/songs" />)
    )

    // on submit button click
    const onSubmit = (e) => {
        e.preventDefault();
        setStatus({ ...status, loading: true, msg: "Submitting..." });

        const token = isAuthenticated() && isAuthenticated().token;

        createSong(formData, token).then((resp) => {
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
                    name: "",
                    description: "",
                    length: "",
                    artist_id: "",
                    genre_id: "",
                    mood_id: "",
                    song_file: "",
                    formData: (new FormData()),
                });
            }
        })
    }

    const form = () => (
        <form className="row form-common align-items-center">
            <p className="text-secondary2 text-uppercase" style={{fontSize:"1.25rem"}}>instructions</p>
            <p className="alert alert-small alert-info col-12 text-center text-secondary2 bg-primary1 border border-secondary2">
                <span className="text-grey">
                    Thumbnail File {">>"} Format: 
                </span> jpg / png / svg
                <span className="ml-1 text-grey">
                        | Max Size:
                </span> 50 KB
            </p>
            <p className="alert alert-small mb-4 alert-info col-12 text-center text-secondary2 bg-primary1 border border-secondary2">
                <span className="text-grey">
                    Song File {">>"} Format:
                </span> mp3 / wav
                <span className="ml-1 text-grey">
                    | Max Size:
                </span> 7 MB
                <span className="ml-1 text-grey">
                    | Max Duration (MM:SS):
                </span> 59 : 59
            </p>
            {message()}
            <Input
                id="name"
                name="name"
                label="Enter song name"
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
                label="Enter song description"
                formClass="col-12"
                labelClass={"text-grey"}
                placeholder="E.g :- Kishore Kumar is awesome singer"
                value={description}
                onChange={handleInputs("description")}
                inputClass="input input-primary2"
            />
            <Input
                id="length"
                name="length"
                label="length (Works Automatically)"
                placeholder={"( Choose File )"}
                formClass="col-12"
                labelClass={"text-grey"}
                // placeholder="E.g :- Kishore Kumar is awesome singer"
                value={length}
                onChange={handleInputs("length")}
                disabled
                inputClass="input input-primary2 disabled border border-primary2"
            />

            <div className="form-group col-sm-4">
                <label
                    htmlFor="artist_id"
                    className="label text-grey"
                >
                    Choose Artist:
                </label>
                <select
                    name="artist_id"
                    id="artist_id"
                    className="input input-primary2"
                    onChange={handleInputs("artist_id")}
                    value={artist_id}
                >
                    <option value="null">
                        -- Select Artist --
                    </option>
                    {
                        preloadedData.artists.map(Option)
                    }
                </select>
            </div>

            <div className="form-group col-sm-4">
                <label
                    htmlFor="genre_id"
                    className="label text-grey"
                >
                    Choose Genre:
                </label>
                <select
                    name="genre_id"
                    id="genre_id"
                    className="input input-primary2"
                    onChange={handleInputs("genre_id")}
                    value={genre_id}
                >
                    <option value="null">
                        -- Select Genre --
                    </option>
                    {
                        preloadedData.genres.map(Option)
                    }
                </select>
            </div>

            <div className="form-group col-sm-4">
                <label
                    htmlFor="mood_id"
                    className="label text-grey"
                >
                    Choose Mood:
                </label>
                <select
                    name="mood_id"
                    id="mood_id"
                    className="input input-primary2"
                    onChange={handleInputs("mood_id")}
                    value={mood_id}
                >
                    <option value="null">
                        -- Select Mood --
                    </option>
                    {
                        preloadedData.moods.map(Option)
                    }
                </select>
            </div>
            <InputFile
                id="thumbnail"
                name="thumbnail"
                label="Choose thumbnail"
                formClass="col-sm-6"
                onChange={handleInputs("thumbnail")}
                isImage
                preiviewImg={thumbnail}
            />

            <InputFile
                id="song_file"
                name="song_file"
                label="Choose Music File"
                formClass="col-sm-6 "
                onChange={handleInputs("song_file")}
                titleClass={"text-grey"}
                preiviewFile={song_file}
            />

            <div className="col-12">
                <button
                    type="button"
                    className="text-white button button-secondary1 w-100 py-2 mt-3"
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </div>
        </form>
    )


    useEffect(() => {
        preload();
    }, [])

    // If success, trigger redirect after 2 sec, (just to look cool).
    useEffect(() => {

        status.error && setTimeout(() => (
            setStatus({
                ...status,
                error: false,
                msg: ""
            })
        ), 3000);


        status.success && setTimeout(() => (
            setStatus({
                ...status,
                loading: false,
                success: false,
                error: false,
                redirect: true,
                msg: ""
            })
        ), 1500);
    }, [status.success, status.error])

    return (
        <Layout title="Add Song">
            {form()}
            {performRedirect()}
        </Layout>
    );
}

export default AddSong;