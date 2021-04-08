import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './styles.css';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
