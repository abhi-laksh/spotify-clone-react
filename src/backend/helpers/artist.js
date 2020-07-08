import { API } from "../api";

// Get All list of artists
export const getAllArtists = () => {
    return (
        fetch(`${API}/artist`, {
            method: "GET",
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Get artist by id
export const getArtistbyId = (id) => {
    return (
        fetch(`${API}/artist?id=${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Update artist
export const updateArtist = (data, token) => {
    return (
        fetch(`${API}/admin/artist/update.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// create artist
export const createArtist = (data, token) => {
    return (
        fetch(`${API}/admin/artist/add.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// delete artist
export const deleteArtist = (id, token) => {
    return (
        fetch(`${API}/admin/artist/delete.php`, {
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
