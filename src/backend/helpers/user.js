import { API } from "../api";


// Add song to fav
export const addToFav = (songId, token) => {
    return (
        fetch(`${API}/favourites/add.php?song=${songId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Remove song from fav
export const removeFromFav = (songId, token) => {
    return (
        fetch(`${API}/favourites/remove.php?song=${songId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Get All Fav Songs
export const getAllFav = (token) => {
    return (
        fetch(`${API}/favourites`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}


// Get Fav by a Song
export const getFavBySong = (songId, token) => {
    return (
        fetch(`${API}/favourites?songid=${songId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}


// Edit profile
export const editProfile = (data, token) => {
    return (
        fetch(`${API}/user/edit.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: data
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Get Profile
export const getProfile = (token) => {
    return (
        fetch(`${API}/user`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}


// Get All Fav Songs
export const getAllPlaylists = (token) => {
    return (
        fetch(`${API}/playlist`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}


// Get All Fav Songs
export const getAllSongsByPlaylistId = (id, token) => {
    return (
        fetch(`${API}/playlist/songs.php?id=${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}



// Get All Fav Songs
export const addSongsToPlaylist = (data, token) => {
    return (
        fetch(`${API}/playlist/add_songs.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Get All Fav Songs
export const removeSongsFromPlaylist = (data, token) => {
    return (
        fetch(`${API}/playlist/remove_songs.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}


// Get All Fav Songs
export const getPlaylistById = (id, token) => {
    return (
        fetch(`${API}/playlist?id=${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// delete artist
export const deletePlaylist = (id, token) => {
    return (
        fetch(`${API}/playlist/delete.php`, {
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


// Add new playlist , also with songs
export const addPlaylist = (data, token) => {
    return (
        fetch(`${API}/playlist/add.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}


// Add new playlist , also with songs
export const updatePlaylist = (data, token) => {
    return (
        fetch(`${API}/playlist/update.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}
