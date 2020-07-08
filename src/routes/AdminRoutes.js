import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, signOut } from "../backend/helpers/auth";

function AdminRoutes({ component: Component, ...props }) {

    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        (isAuthenticated() && (isAuthenticated().user) && (isAuthenticated().user.role == 1))
            ? (
                ((new Date().getTime() / 1000) > isAuthenticated().expiresIn)
                    ? (
                        signOut(() => {
                            setIsExpired(true);
                        })
                    )
                    : setIsExpired(false)
            )
            : setIsExpired(true);

    }, [isExpired]);

    return (

        <Route
            {...props}
            render={(props) => (
                (!isExpired)
                    ? (<Component {...props} />)
                    : (
                        <Redirect
                            to={{
                                pathname: "/admin/signin",
                                state: { from: props.location }
                            }}
                        />
                    )
            )}
        />
    );
}

export default AdminRoutes;