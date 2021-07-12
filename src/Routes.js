import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isAuthenticated, signOut } from './backend/helpers/auth';
import Account from './routes/Account';
import AddArtist from './routes/Admin/AddArtist';
import AddGenre from './routes/Admin/AddGenre';
import AddMood from './routes/Admin/AddMood';
import AddSong from './routes/Admin/AddSong';
import Artists from './routes/Admin/Artists';
import Dashboard from './routes/Admin/Dashboard';
import EditArtist from './routes/Admin/EditArtist';
import EditGenre from './routes/Admin/EditGenre';
import EditMood from './routes/Admin/EditMood';
import EditSong from './routes/Admin/EditSong';
import Genres from './routes/Admin/Genres';
import Moods from './routes/Admin/Moods';
import AdminSignIn from './routes/Admin/SignIn';
import Songs from './routes/Admin/Songs';
import AdminRoutes from './routes/AdminRoutes';
import Home from './routes/Home/Home';
import ProtectedRoutes from './routes/ProtectedRoutes';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Favourites from './routes/Webplayer/Favourites';
import Playlist from './routes/Webplayer/Playlist';
import PlaylistDetails from './routes/Webplayer/PlaylistDetails';
import Search from './routes/Webplayer/Search';
import Webplayer from './routes/Webplayer/Webplayer';


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
                <ProtectedRoutes path="/playlist" exact component={Playlist} />
                <ProtectedRoutes path="/playlist/details/:id" exact component={PlaylistDetails} />

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