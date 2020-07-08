import { API } from "../api";


// Get All list of moods
export const getAllMoods = () => {
    return (
        fetch(`${API}/mood`, {
            method: "GET",
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Get mood by id
export const getMoodbyId = (id) => {
    return (
        fetch(`${API}/mood?id=${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Update mood
export const updateMood = (data, token) => {
    return (
        fetch(`${API}/admin/mood/update.php`, {
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

// create mood
export const createMood = (data, token) => {
    return (
        fetch(`${API}/admin/mood/add.php`, {
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

// delete mood
export const deleteMood = (id,token) => {
    return (
        fetch(`${API}/admin/mood/delete.php`, {
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
