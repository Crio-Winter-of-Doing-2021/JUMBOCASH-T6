import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

import Loader from '../Loader';

import { getCashflowAnalytics } from '../../store/actions/cashflowAnalyticsActions';

const ReportTable = ({
  date,
  getCashflowAnalytics,
  analytics: { isCashflowAnalyticsLoading, cashflowAnalytics, cashflowAnalyticsError },
}) => {
  useEffect(() => {
    if (!isCashflowAnalyticsLoading) {
      getCashflowAnalytics();
    }
  }, [date]);

  return (
    <Card className="p-my-3">
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
          <div className="p-datatable p-component">
            <table>
              <thead className="p-datatable-thead">
                <tr>
                  <th colSpan={3}>Net Inflow (A)</th>
                </tr>
              </thead>
              <tbody className="p-datatable-tbody">
                <tr>
                  <td colSpan={2}>I. Sales</td>
                  <td className="text-success">{cashflowAnalytics?.cashflowByType.inflow['SALES'] || 0}</td>
                </tr>
                <tr>
                  <td colSpan={2}>II. Asset Liquidation</td>
                  <td className="text-success">{cashflowAnalytics?.cashflowByType.inflow['ASSET_LIQUIDATION'] || 0}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="p-text-center text-bold-500">A(I) + A(II)</td>
                  <td className="text-success">{cashflowAnalytics?.currInflow || 0}</td>
                </tr>
              </tbody>
              <thead className="p-datatable-thead">
                <tr>
                  <th colSpan="3">Net Outflow (B)</th>
                </tr>
              </thead>
              <tbody className="p-datatable-tbody">
                <tr>
                  <td colSpan={2}>I. Purchase</td>
                  <td className="text-danger">{cashflowAnalytics?.cashflowByType.outflow['PURCHASE'] || 0}</td>
                </tr>
                <tr>
                  <td colSpan={2}>II. Employee Payroll</td>
                  <td className="text-danger">{cashflowAnalytics?.cashflowByType.outflow['EMPLOYEE'] || 0}</td>
                </tr>
                <tr>
                  <td colSpan={2}>III. Tax</td>
                  <td className="text-danger">{cashflowAnalytics?.cashflowByType.outflow['TAX'] || 0}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="p-text-center text-bold-500">B(I) + B(II) + B(III)</td>
                  <td className="text-danger">{cashflowAnalytics?.currOutflow || 0}</td>
                </tr>
                <tr>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
              <thead className="p-datatable-thead">
                <tr>
                  <th colSpan="2">Net Cashflow (A - B)</th>
                  <th className={cashflowAnalytics?.netCashflow > 0 ? 'text-success' : 'text-danger'}>{cashflowAnalytics?.netCashflow || 0}</th>
                </tr>
              </thead>
            </table>
          </div>
        )
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  date:state.appDate,
  analytics: state.cashflowAnalytics,
});

export default connect(mapStateToProps, { getCashflowAnalytics })(ReportTable);
