import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import { getTransactions } from '../../store/actions/transactionActions';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Message } from 'primereact/message';
import { Categories, PaymentModes, PaymentStatuses } from '../../constants';
import Loader from '../Loader/Loader';

import placeholder from '../../static/assets/images/placeholder.png';
import upi from '../../static/assets/images/upi.png';
import cash from '../../static/assets/images/cash.png';
import debit_card from '../../static/assets/images/debit_card.png';
import credit_card from '../../static/assets/images/credit_card.png';

import './styles.css';

const paymentModeImgMap = {
  UPI: upi,
  CASH: cash,
  DEBIT_CARD: debit_card,
  CREDIT_CARD: credit_card,
};

const paymentModeBodyTemplate = ({ paymentMode }) => {
  return (
    <>
      <img
        alt={paymentMode}
        src={paymentModeImgMap[paymentMode]}
        onError={(e) => (e.target.src = placeholder)}
        className="va-mid"
        width={30}
      />
      <span className="p-ml-2 va-mid">{paymentMode}</span>
    </>
  );
};

const paymentStatusBodyTemplate = ({ paymentStatus }) => {
  return (
    <>
      <span className={`payment-status-badge status-${paymentStatus}`}>{paymentStatus}</span>
    </>
  );
};

const cardTitle = (
  <div className="p-card-title p-d-flex">
    Transactions{' '}
    <Button type="Button" icon="pi pi-refresh" className="p-ml-auto" tooltip="Refresh" />
  </div>
);

const TransactionsTable = ({ transaction: { transactions,isLoading,error },getTransactions, editTransactionDialog }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const dt = useRef(null);
  
  useEffect(()=>{
    getTransactions()
  },[])

  const SelectFilter = ({ field, options }) => {
    const [value, setValue] =
      field === 'category'
        ? [selectedCategory, setSelectedCategory]
        : field === 'paymentStatus'
        ? [selectedPaymentStatus, setSelectedPaymentStatus]
        : [selectedPaymentMode, setSelectedPaymentMode];
    const onSelectionChange = (e) => {
      dt.current.filter(e.value, field, 'in');
      setValue(e.value);
    };
    return (
      <MultiSelect
        value={value}
        options={options}
        onChange={onSelectionChange}
        optionLabel="label"
        optionValue="value"
        placeholder="All"
        className="p-column-filter"
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-outlined p-button-info"
          iconPos="left"
          label="Edit"
          onClick={() => editTransactionDialog(rowData)}
        />
      </>
    );
  };

  if(error){
      return <Message severity="error" text={error} style={{ display: 'block' }}></Message>
  }
  return (
    <Card title={cardTitle}>
       {error && <Message severity="error" text={error} style={{ display: 'block' }}></Message>} 
       {!error && isLoading && <Loader />}
      {!error && !isLoading && <DataTable
        ref={dt}
        className="table-responsive"
        value={transactions}
        paginator
        rows={5}
        sortMode="multiple"
        removableSort
        emptyMessage="No transactions found."
      >
        <Column
          field="entityId"
          header="Entity"
          sortable
          filter
          filterMatchMode="contains"
          filterPlaceholder="Search by entity"
        />
        <Column
          field="amount"
          header="Amount"
          sortable
          filter
          filterMatchMode="contains"
          filterPlaceholder="Search by amount"
        />
        <Column
          field="paymentStatus"
          header="Payment Status"
          body={paymentStatusBodyTemplate}
          sortable
          filter
          filterMatchMode="contains"
          filterElement={<SelectFilter field="paymentStatus" options={PaymentStatuses} />}
        />
        <Column
          field="paymentMode"
          header="Payment Mode"
          body={paymentModeBodyTemplate}
          sortable
          filter
          filterMatchMode="contains"
          filterElement={<SelectFilter field="paymentMode" options={PaymentModes} />}
        />
        <Column
          field="category"
          header="Category"
          sortable
          filter
          filterMatchMode="contains"
          filterElement={<SelectFilter field="category" options={Categories} />}
        />
        <Column body={actionBodyTemplate}></Column>
      </DataTable>}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});

export default connect(mapStateToProps, { getTransactions })(TransactionsTable);
