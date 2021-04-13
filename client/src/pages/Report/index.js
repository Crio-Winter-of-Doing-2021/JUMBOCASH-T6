import React, { useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'primereact/button';

import requireAuth from '../../hoc/requireAuth';

import Layout from '../../layout/Layout';
import NotauthenticatedAlert from '../../components/NotauthenticatedAlert';

import ReportTable from '../../components/ReportTable';
import AnalyticsGrid from '../../components/AnalyticsGrid';

import componentToPdf from '../../utils/componentToPdf';

const Report = ({ date: { from, to }, auth }) => {
  const reportRef = useRef(null);

  const downloadPdf = () => {
    componentToPdf(reportRef);
  };

  return (
    <Layout>
      <div style={{ marginTop: '1rem' }}>
        {!auth.isAuthenticated ? (
          <NotauthenticatedAlert />
        ) : (
          <>
            <div className="p-d-flex p-jc-end p-px-3">
              <Button label="Download Report" icon={`pi pi-file-pdf`} onClick={downloadPdf} />
            </div>
            <div ref={reportRef} className="p-p-3">
              <div className="p-text-center">
                <h1 className="p-mb-0">Cashflow Report</h1>
                <h3 className="text-secondary p-mt-1">
                  {from.toDateString()} - {to.toDateString()}
                </h3>
              </div>
              <AnalyticsGrid />
              <ReportTable />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  date: state.appDate,
  auth: state.auth,
});

export default compose(requireAuth, connect(mapStateToProps))(Report);
