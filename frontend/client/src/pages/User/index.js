import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import requireAuth from '../../hoc/requireAuth';

import Layout from '../../layout/Layout';
import NotauthenticatedAlert from '../../components/NotauthenticatedAlert';

import UserForm from '../../components/UserForm';


const User = ({ auth }) => {
  
  return (
    <Layout>
      <div style={{marginTop:'1rem',marginBottom:'1rem'}}>
      {!auth.isAuthenticated ? (
        <NotauthenticatedAlert />
      ) : (
        <>
          <UserForm initialValues={auth.user}/>
        </>
      )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(requireAuth, connect(mapStateToProps))(User);
