import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './routes/Home/Home';
import Webplayer from './routes/Webplayer/Webplayer';
import Search from './routes/Webplayer/Search';

import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';

import AdminSignIn from './routes/Admin/SignIn';

import ProtectedRoutes from './routes/ProtectedRoutes';

import Account from './routes/Account';


import AdminRoutes from './routes/AdminRoutes';
import Dashboard from './routes/Admin/Dashboard';

import Artists from './routes/Admin/Artists';
import EditArtist from './routes/Admin/EditArtist';
import AddArtist from './routes/Admin/AddArtist';

import Genres from './routes/Admin/Genres';
import AddGenre from './routes/Admin/AddGenre';
import EditGenre from './routes/Admin/EditGenre';

import Moods from './routes/Admin/Moods';
import AddMood from './routes/Admin/AddMood';
import EditMood from './routes/Admin/EditMood';

import Songs from './routes/Admin/Songs';
import AddSong from './routes/Admin/AddSong';
import EditSong from './routes/Admin/EditSong';

import { isAuthenticated, signOut } from './backend/helpers/auth';
import Favourites from './routes/Webplayer/Favourites';

function Routes(props) {


    const [isTokenExpired, setIsTokenExpired] = useState(false);

    useEffect(() => {
        (
            isAuthenticated()
            && isAuthenticated().user
            && ((new Date().getTime() / 1000) >= (isAuthenticated().expiresIn))
            && setIsTokenExpired(true)
        );

        isTokenExpired && signOut(() => {
            setIsTokenExpired(false);
        })
    }, [isTokenExpired])
 

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />

                <Route path="/webplayer" exact component={Webplayer} />
                <Route path="/webplayer/search" exact component={Search} />

                <Route path="/admin/signin" exact component={AdminSignIn} />
                <ProtectedRoutes path="/account" exact component={Account} />
                <ProtectedRoutes path="/favourites" exact component={Favourites} />

                <AdminRoutes path="/admin" exact component={Dashboard} />
                <AdminRoutes path="/admin" exact component={Dashboard} />

                <AdminRoutes path="/admin/artists" exact component={Artists} />
                <AdminRoutes path="/admin/artists/add" exact component={AddArtist} />
                <AdminRoutes path="/admin/artists/edit/:artistId" exact component={EditArtist} />

                <AdminRoutes path="/admin/genres" exact component={Genres} />
                <AdminRoutes path="/admin/genres/add" exact component={AddGenre} />
                <AdminRoutes path="/admin/genres/edit/:genreId" exact component={EditGenre} />

                <AdminRoutes path="/admin/moods" exact component={Moods} />
                <AdminRoutes path="/admin/moods/add" exact component={AddMood} />
                <AdminRoutes path="/admin/moods/edit/:moodId" exact component={EditMood} />

                <AdminRoutes path="/admin/songs" exact component={Songs} />
                <AdminRoutes path="/admin/songs/add" exact component={AddSong} />
                <AdminRoutes path="/admin/songs/edit/:songId" exact component={EditSong} />

            </Switch>
        </Router>
    );
}
export default Routes;