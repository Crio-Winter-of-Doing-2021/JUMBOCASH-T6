import React from 'react';
import CashflowSummaryCard from '../CashflowSummaryCard';
import TopEntitiesCard from '../TopEntitiesCard';
import TransactionsTrendCard from '../TransactionsTrendCard';

const AnalyticsGrid = () => {
    return <div className="p-grid nested-grid p-mb-3">
    <div className="p-col-12 p-lg-12">
      <CashflowSummaryCard />
    </div>
    <div className="p-col-12 p-lg-6">
      <TopEntitiesCard />
    </div>
    <div className="p-col-12 p-lg-6">
      <TransactionsTrendCard />
    </div>
  </div>
}

export default AnalyticsGrid;