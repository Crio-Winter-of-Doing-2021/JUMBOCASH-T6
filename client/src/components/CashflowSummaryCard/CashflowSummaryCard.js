import React from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Divider } from 'primereact/divider';
import {Card} from 'primereact/card';

import './styles.css';
const CashflowSummaryCard = () => {
  return (
    <Card title="Cashflow Summary" className="cashflow-summary h-100">
      <p className="p-mt-0" style={{ color: 'grey' }}>
        Total Transaction Amount - $10000
      </p>
      <ProgressBar showValue={false} color="#95e597" value="80" />
      <Divider />
      <div className="p-grid p-text-bold p-my-3">
        <div className="p-col">
          <div style={{ color: '#95e597' }}>Total Inflow </div>
          <div>$8000</div>
        </div>
        <Divider layout="vertical" />
        <div className="p-col">
          <div style={{ color: '#f3c287' }}>Total Outflow</div>
          <div>$2000</div>
        </div>
      </div>
    </Card>
  );
};

export default CashflowSummaryCard;
