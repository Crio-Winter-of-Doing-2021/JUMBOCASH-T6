import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';

import { getEntityAnalytics } from '../../store/actions/entityAnalyticsActions';

import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';

import Loader from '../Loader';

import { PaymentStatuses } from '../../constants';

const TopEntitiesCard = ({
  getEntityAnalytics,
  analytics: { isEntityAnalyticsLoading, entityAnalytics, entityAnalyticsError },
  entity: { entitiesMap, isLoading },
}) => {
  const now = moment();
  const [interval, setInterval] = useState([new Date(now.subtract(1, 'years')), new Date()]);
  const [paymentStatus, setPaymentStatus] = useState('PAID');

  useEffect(() => {
    if (!isEntityAnalyticsLoading) {
      getEntityAnalytics(interval);
    }
  }, []);

  const onIntervalChange = (value) => {
    setInterval(value);
    if (!isEntityAnalyticsLoading && value[0] && value[1]) {
      getEntityAnalytics(value);
    }
  };

  const onPaymentStatusChange = (value) => {
    setPaymentStatus(value);
  };

  const generateColorShades = (arr) => {
    const ratio = 1 / arr.length;
    return arr.map((x, index) => `rgba(76,175,80,${1 - index * ratio})`);
  };

  const chartData = () => {
    const labels =
      paymentStatus === 'PAID'
        ? entityAnalytics?.inflowLabels
        : entityAnalytics?.pendingInflowLabels;
    const values =
      paymentStatus === 'PAID'
        ? entityAnalytics?.inflowValues
        : entityAnalytics?.pendingInflowValues;
    return {
      labels: labels?.map((id) => entitiesMap[id]?.name) || [],
      datasets: [
        {
          data: values || [],
          backgroundColor: generateColorShades(labels || []),
        },
      ],
    };
  };

  const chartOptions = {
    legend: {
      position: 'right',
    },
  };

  const paymentStatusRadioButtons = (
    <div>
      <div>Payment Status</div>
      <div className="p-d-flex p-mt-1" style={{ fontSize: '0.9rem' }}>
        {PaymentStatuses.map((item) => (
          <span key={item.value}>
            <RadioButton
              inputId={item.value}
              value={item.value}
              name={item.label}
              onChange={(e) => onPaymentStatusChange(e.value)}
              checked={paymentStatus === item.value}
            />
            <label htmlFor={item.value} className="p-p-1">{item.label}</label>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <Card title="Top Vendors/Customers" className="h-100">
      <div className="p-d-flex p-jc-between p-mb-3">
        {paymentStatusRadioButtons}
        <Calendar
          id="dateRange"
          selectionMode="range"
          monthNavigator
          yearNavigator
          yearRange={`2010:${new Date().getFullYear()}`}
          value={interval}
          onChange={(e) => onIntervalChange(e.value)}
          showIcon
        ></Calendar>
      </div>

      {isEntityAnalyticsLoading || isLoading ? (
        <Loader />
      ) : entityAnalyticsError ? (
        <Message
          severity="error"
          content={<p>{entityAnalyticsError}</p>}
          className="p-text-center"
          style={{ display: 'block' }}
        ></Message>
      ) : (
        entityAnalytics && <Chart type="doughnut" data={chartData()} options={chartOptions} />
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  analytics: state.entityAnalytics,
  entity: state.entity,
});

export default connect(mapStateToProps, { getEntityAnalytics })(TopEntitiesCard);
