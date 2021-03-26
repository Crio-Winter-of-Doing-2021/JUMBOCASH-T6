import React from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';

const MonthlyTransactionsCard = () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        type: 'bar',
        label: 'Debit',
        backgroundColor: '#f3c287',
        data: [21, 84, 24, 75, 37, 65, 34],
      },
      {
        type: 'bar',
        label: 'Credit',
        backgroundColor: '#95e597',
        data: [41, 52, 24, 74, 23, 21, 32],
      },
    ],
  };

  const chartOptions = {
  };

  return (
    <Card title="Monthly Transactions Trend" className="h-100">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </Card>
  );
};

export default MonthlyTransactionsCard;
