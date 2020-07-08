import { API } from "../api";


// Get All list of songs
export const getAllSongs = () => {
    return (
        fetch(`${API}/song`, {
            method: "GET",
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Get song by id
export const getSongbyId = (id) => {
    return (
        fetch(`${API}/song?id=${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}


// Update song
export const updateSong = (data, token) => {
    return (
        fetch(`${API}/admin/song/update.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: data
        }).then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// create song
export const createSong = (data, token) => {
    return (
        fetch(`${API}/admin/song/add.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                // "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            body: data
        }).then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// delete song
export const deleteSong = (id, token) => {
    return (
        fetch(`${API}/admin/song/delete.php`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(id)
        }).then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}


// create song
export const streamSong = (path) => {
    return (
        fetch(`${API}/stream?song=${path}`, {
            method: "GET",
        }).then((response) => response.arrayBuffer())
            .catch((err) => { console.warn(err) })
    )
}


