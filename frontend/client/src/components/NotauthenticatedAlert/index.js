import React from 'react';
import { Link } from 'react-router-dom';
import { Message } from 'primereact/message';

const AlertContent = () => (
  <p>
    Welcome guest! You are not authenticated to access this page.
    Please{' '}
    <Link className="bold" to="/login">
      Log in
    </Link>{' '}
    or{' '}
    <Link className="bold" to="/register">
      Register{' '}
    </Link>
    to continue.
  </p>
);
const NotauthenticatedAlert = () => {
  return (
    <Message severity="warn" content={AlertContent} style={{ display: 'block' }}></Message>
  );
};

export default NotauthenticatedAlert;
