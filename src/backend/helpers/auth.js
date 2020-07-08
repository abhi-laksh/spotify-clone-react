import { API } from '../api';
// Sign Up
export const signUp = (data) => {
    return (
        fetch(`${API}/user/signup.php`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: data
        }).then((response) => (response.json())).catch((err) => { console.error(err) })
    )
}

// Sign In
export const signIn = (data) => {
    return (
        fetch(`${API}/user/login.php`, {
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

// Check for token
export const isAuthenticated = () => (
    (typeof window !== "undefined")
    && (localStorage.getItem("jwt"))
    && JSON.parse(localStorage.getItem("jwt"))
)

// Log out
export const signOut = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();
    }
}