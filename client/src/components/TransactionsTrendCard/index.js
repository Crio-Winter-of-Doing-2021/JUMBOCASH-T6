import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getTrends } from '../../store/actions/analyticsActions';

import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { RadioButton } from 'primereact/radiobutton';

import Loader from '../Loader';
import { Intervals } from '../../constants';

const TransactionsTrendCard = ({
  getTrends,
  analytics: { isTrendsLoading, trends, trendsError },
}) => {
  const [interval, setInterval] = useState('week');

  useEffect(() => {
    if (!isTrendsLoading) {
      getTrends(interval);
    }
  }, []);

  const onIntervalChange = (value) => {
    if (!isTrendsLoading && value!==interval) {
      setInterval(value);
      getTrends(value);
    }
  };

  const chartData = {
    labels: trends?.labels || [],
    datasets: [
      {
        type: 'bar',
        label: 'Outflow',
        backgroundColor: '#f3c287',
        data: trends?.outflowValues || [],
        stack:0
      },
      {
        type: 'bar',
        label: 'Inflow',
        backgroundColor: '#95e597',
        data: trends?.inflowValues || [],
        stack:1
      },
      {
        type: 'bar',
        label: 'Pending-Outflow',
        backgroundColor:'#f18a53',
        data: trends?.pendingOutflowValues || [],
        stack:0
      },
      {
        type: 'bar',
        label: 'Pending-Inflow',
        backgroundColor:'#76cc79',
        data: trends?.pendingInflowValues || [],
        stack:1
      }
      
    ],
  };

  const chartOptions = {
    scales: {
      bounds: 'data',
      xAxes: [
        {
          type: 'time',
          time: {
            unit: interval === 'quarter' ? 'quarter' : '',
            tooltipFormat:
              interval === 'week' ? 'DD MMM YY' : interval === 'year' ? 'YYYY' : 'MMM YY',
          },
          ticks: {
            source: 'labels',
          },
          offset: true,
          stacked:true
        },
      ],
    },
  };

  const intervalRadioButtons = (
    <div className="p-d-flex p-jc-between p-mb-3" style={{ fontSize: '0.95rem' }}>
      <span>Last 6</span>
      {Intervals.map((item) => (
        <span key={item.value}>
          <RadioButton
            inputId={item.value}
            value={item.value}
            name={item.label}
            onChange={(e) => onIntervalChange(e.value)}
            checked={interval === item.value}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </span>
      ))}
    </div>
  );
  return (
    <Card title="Transactions Trend" className="h-100">
      {intervalRadioButtons}
      {isTrendsLoading ? (
        <Loader />
      ) : trendsError ? (
        <Message
          severity="error"
          content={<p>{trendsError}</p>}
          className="p-text-center"
          style={{ display: 'block' }}
        ></Message>
      ) : (
        trends && <Chart type="bar" data={chartData} options={chartOptions} />
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  analytics: state.analytics,
});

export default connect(mapStateToProps, { getTrends })(TransactionsTrendCard);
