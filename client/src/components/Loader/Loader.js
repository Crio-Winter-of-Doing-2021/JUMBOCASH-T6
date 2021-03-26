import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';


const Loader = (props) => {
  return (
    <ProgressSpinner className="p-d-flex p-jc-center p-ai-center loader-container"/>
  );
};

export default Loader;
