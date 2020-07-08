import { API } from "../api";

// Get All list of genres
export const getAllGenres = () => {
    return (
        fetch(`${API}/genre`, {
            method: "GET",
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Get genre by id
export const getGenrebyId = (id) => {
    return (
        fetch(`${API}/genre?id=${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Update genre
export const updateGenre = (data, token) => {
    return (
        fetch(`${API}/admin/genre/update.php`, {
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

// create genre
export const createGenre = (data, token) => {
    return (
        fetch(`${API}/admin/genre/add.php`, {
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

// delete genre
export const deleteGenre = (id,token) => {
    return (
        fetch(`${API}/admin/genre/delete.php`, {
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
