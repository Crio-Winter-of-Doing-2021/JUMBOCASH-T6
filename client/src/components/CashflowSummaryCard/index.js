import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getCashflowAnalytics } from '../../store/actions/cashflowAnalyticsActions';

import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';

import Loader from '../Loader';

import './styles.css';

const CashflowSummaryCard = ({
  getCashflowAnalytics,
  analytics: { isCashflowAnalyticsLoading, cashflowAnalytics, cashflowAnalyticsError },
  date
}) => {

  useEffect(() => {
    if (!isCashflowAnalyticsLoading) {
      getCashflowAnalytics();
    }
  }, [date]);

  return (
    <Card title="Cashflow Summary" className="cashflow-summary h-100">
      {isCashflowAnalyticsLoading ? (
        <Loader />
      ) : cashflowAnalyticsError ? (
        <Message
          severity="error"
          content={<p>{cashflowAnalyticsError}</p>}
          className="p-text-center"
          style={{ display: 'block' }}
        ></Message>
      ) : (
        cashflowAnalytics && (
          <>
            <p className="p-mt-0" style={{ color: 'grey' }}>
              Total Transaction Amount - ${cashflowAnalytics.totalTransactions}
            </p>
            <ProgressBar
              showValue={false}
              color="#95e597"
              value={(cashflowAnalytics.totalInflow / cashflowAnalytics.totalTransactions) * 100}
            />
            <Divider />
            <div className="p-grid p-text-bold p-my-3">
              <div className="p-col">
                <div className="p-grid">
                  <div className="p-col">
                    <div style={{ color: '#95e597' }}>Total Inflow </div>
                    <div>${cashflowAnalytics.totalInflow}</div>
                  </div>
                  <div className="p-col">
                    <div style={{ color: '#76cc79' }}>Pending Inflow </div>
                    <div>${cashflowAnalytics.pendingInflow}</div>
                  </div>
                </div>
              </div>
              <Divider layout="vertical" />
              <div className="p-col">
                <div className="p-grid">
                  <div className="p-col">
                    <div style={{ color: '#f3c287' }}>Total Outflow</div>
                    <div>${cashflowAnalytics.totalOutflow}</div>
                  </div>
                  <div className="p-col">
                    <div style={{ color: '#f18a53' }}>Pending Outflow</div>
                    <div>${cashflowAnalytics.pendingOutflow}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  date: state.appDate,
  analytics: state.cashflowAnalytics,
});

export default connect(mapStateToProps, { getCashflowAnalytics })(CashflowSummaryCard);
