import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import requireAuth from '../../hoc/requireAuth';

import Layout from '../../layout/Layout';
import NotauthenticatedAlert from '../../components/NotauthenticatedAlert/NotauthenticatedAlert';

import Dashboard from '../../components/Dashboard/Dashboard';


const Home = ({ auth }) => {
  
  return (
    <Layout>
      <div style={{marginTop:'1rem'}}>
      {!auth.isAuthenticated ? (
        <NotauthenticatedAlert />
      ) : (
        <>
          <Dashboard />
        </>
      )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(requireAuth, connect(mapStateToProps))(Home);
