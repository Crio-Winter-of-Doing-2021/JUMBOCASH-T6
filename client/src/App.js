import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { ToastContainer } from 'react-toastify';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

import Loader from './components/Loader/Loader';

import { logInUserWithOauth, loadUser } from './store/actions/authActions';

const App = ({ logInUserWithOauth, auth, loadUser }) => {

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    
    if (window.location.hash === '#_=_') window.location.hash = '';
    const cookieJwt = Cookies.get('x-auth-cookie');
    if (cookieJwt) {
      Cookies.remove('x-auth-cookie');
      logInUserWithOauth(cookieJwt);
    }
  }, []);

  useEffect(() => {
    if (!auth.appLoaded && !auth.isLoading && auth.token && !auth.isAuthenticated) {
      loadUser();
    }
  }, [auth.isAuthenticated, auth.token, loadUser, auth.isLoading, auth.appLoaded]);

  return (
    <>
      {auth.appLoaded ? (
        <>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/report" component={Home} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
        <ToastContainer hideProgressBar pauseOnFocusLoss={false}/>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { logInUserWithOauth, loadUser }))(App);
