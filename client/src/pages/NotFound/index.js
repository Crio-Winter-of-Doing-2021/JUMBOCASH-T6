import React from 'react';
import { Link } from 'react-router-dom';

import error_404 from '../../static/assets/images/error_404.svg';
import Layout from '../../layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div style={{textAlign:'center'}}>
        <img src={error_404} alt="404_error" width="500"/>
        <p>
          Go back to{' '}
          <Link className="bold" to="/">
            Home
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default NotFound;
