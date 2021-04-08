import React from 'react';
import { Chart } from 'primereact/chart';
import {Card} from 'primereact/card';

const TopEntitiesCard = () => {
  const chartData = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [
      {
        data: [300, 250, 180,100,50],
        backgroundColor: ['#28df99', '#99f3bd','#82efc5','#d2f6c5','#e9f5e5'],
      },
    ],
  };

  const chartOptions = {
    legend: {
      position:'right'
    },
  };

  return (
    <Card title="Top Vendors/Customers" className="h-100">
      <Chart type="doughnut" data={chartData} options={chartOptions} />
    </Card>
  );
};

export default TopEntitiesCard;
