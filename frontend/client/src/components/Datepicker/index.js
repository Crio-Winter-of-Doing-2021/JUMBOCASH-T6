import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Calendar } from 'primereact/calendar';

import { updateDate } from '../../store/actions/appDateActions';

const Datepicker = ({ date: { from, to }, updateDate }) => {
  const [interval, setInterval] = useState([from, to]);

  const onIntervalChange = (value) => {
    setInterval(value);
    if (value[0] && value[1]) {
      updateDate(value);
    }
  };

  return (
    <div className="p-d-flex p-jc-end">
      <div>
        <div className="p-mb-1">Date Range</div>
        <Calendar
          id="dateRange"
          selectionMode="range"
          monthNavigator
          yearNavigator
          yearRange={`2010:${new Date().getFullYear()}`}
          value={interval}
          onChange={(e) => onIntervalChange(e.value)}
          showIcon
          className="p-mb-3"
        ></Calendar>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  date: state.appDate,
});

export default connect(mapStateToProps, { updateDate })(Datepicker);
