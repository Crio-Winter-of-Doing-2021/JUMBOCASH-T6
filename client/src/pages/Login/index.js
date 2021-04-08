import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import login_banner from '../../static/assets/images/login_banner.svg';
import placeholder from '../../static/assets/images/placeholder.png';
import logo from '../../static/assets/images/logo.png';

import { Card } from 'primereact/card';

import {GOOGLE_AUTH_LINK} from '../../constants/index';

import './styles.css';

const Login = ({ auth }) => {
  if (auth.isAuthenticated) return <Redirect to="/" />;
  return (
    <div className="p-d-flex p-jc-center p-ai-center bg-green-gradient h-100">
      <Card>
        <div className="p-grid">
          <div className="p-col-12 p-md-6 p-lg-6 p-d-flex p-flex-column p-jc-center p-ai-center">
            <img
              src={logo}
              onError={(e) => (e.target.src = placeholder)}
              alt="flowex logo"
              width="100"
            />
            <h1>
              Hello{' '}
              <span role="img" aria-label="Hello">
                👋
              </span>{' '}
              Welcome to <span className="text-primary">Flowex</span>.
            </h1>
            <h2>Please, login to continue</h2>
            <a className="p-button p-button-rounded p-mb-4 login-btn-google" href={GOOGLE_AUTH_LINK}>
              <i className="pi pi-google p-mr-2" />
              Login with Google
            </a>
            {/* <Button
              label="Login with Facebook"
              icon="pi pi-facebook"
              className="p-button-rounded login-btn-fb"
              onClick={()=>logInUserWithOauth(1)}
            /> */}
          </div>
          <div className="p-col-12 p-md-6 p-lg-6">
            <img
              src={login_banner}
              onError={(e) => (e.target.src = placeholder)}
              alt="login banner"
              width="500"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps))(Login);
