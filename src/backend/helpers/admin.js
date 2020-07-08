import { API } from "../api";

// Sign In
export const signIn = (data) => {
    return (
        fetch(`${API}/admin/login.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}

// Authenticate Middleware
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        let timeInSec = (new Date().getTime() / 1000);
        localStorage.setItem("jwt", JSON.stringify({
            ...data,
            expiresIn: timeInSec + data.expiresIn,
            signedInAt: timeInSec,
        }));
        next();
    }
}

// Profile Edit
export const editProfile = (data) => {
    return (
        fetch(`${API}/admin/account/edit.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}
// Get details
export const getProfile = (data) => {
    return (
        fetch(`${API}/admin/account`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .catch((err) => { console.warn(err) })
    )
}