import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import * as Papa from 'papaparse';

import { getEntities } from '../../store/actions/entityActions';
import { addMultipleTransactions, getTransactions } from '../../store/actions/transactionActions';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Message } from 'primereact/message';
import { FileUpload } from 'primereact/fileupload';
import {
  Categories,
  PaymentModeLabelMap,
  PaymentStatusLabelMap,
  PaymentModes,
  PaymentStatuses,
  CategoryLabelMap,
  TransactionTableHeaderLabelMap,
} from '../../constants';
import Loader from '../Loader';

import placeholder from '../../static/assets/images/placeholder.png';
import upi from '../../static/assets/images/upi.png';
import cash from '../../static/assets/images/cash.png';
import debit_card from '../../static/assets/images/debit_card.png';
import credit_card from '../../static/assets/images/credit_card.png';

import './styles.css';
import { transactionFormSchema } from '../TransactionFormDialog/validation';

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
      <span className="p-ml-2 va-mid">{PaymentModeLabelMap[paymentMode]}</span>
    </>
  );
};

const paymentStatusBodyTemplate = ({ paymentStatus }) => {
  return (
    <>
      <span className={`payment-status-badge status-${paymentStatus}`}>
        {PaymentStatusLabelMap[paymentStatus]}
      </span>
    </>
  );
};

const TransactionsTable = ({
  transaction,
  entity,
  getTransactions,
  getEntities,
  addMultipleTransactions,
  editTransactionDialog,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const dt = useRef(null);
  let fileUploader = useRef(null);

  useEffect(() => {
    if (!transaction.transactions.length && !transaction.isLoading) {
      getTransactions();
    }
    if (!entity.entities.length && !entity.isLoading) {
      getEntities();
    }
  }, []);

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const fileUploadHandler = (event, form) => {
    toast.warning('📃 File parsing is in progress.');
    Papa.parse(event.files[0], {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        return TransactionTableHeaderLabelMap[header];
      },
      complete: async (results) => {
        fileUploader.clear();
        if (!results.errors.length && results.data.length) {
          for (let i = 0; i < results.data.length; i++) {
            const item = results.data[i];
            const isValidRow = await transactionFormSchema.isValid(item);
            if (!isValidRow) {
              toast.error(
                `❌ Failed to parse file. Some fields at row ${i + 2} violate the schema.`,
              );
              return;
            }
          }
        } else if (results.data.length <= 1) {
          // empty or with only header
          toast.error(`File is empty with no rows.`);
          return;
        } else {
          const errMessage = results.errors[0].message;
          const rowNum =
            results.errors[0].row !== undefined ? `Error at row:${results.errors[0].row + 2}.` : '';
          toast.error(`❌ Failed to parse file. ${rowNum} ${errMessage}`);
          return;
        }
        addMultipleTransactions(results.data);
      },
      error: (err) => {
        fileUploader.clear();
        toast.error('❌ Failed to parse file.');
      },
    });
  };

  const cardTitle = (
    <div className="p-card-title p-d-flex p-jc-between">
      <div>List of Transactions</div>
      <div className="p-d-flex p-flex-wrap">
        <FileUpload
          ref={(el) => (fileUploader = el)}
          className="p-mr-2"
          auto
          accept=".csv"
          chooseLabel="Import CSV"
          mode="basic"
          customUpload
          uploadHandler={fileUploadHandler}
        />
        <Button
          type="Button"
          icon="pi pi-download"
          className="p-button-info p-mr-4"
          label="Export CSV"
          onClick={exportCSV}
        />
        <Button type="Button" icon="pi pi-refresh" tooltip="Refresh" onClick={getTransactions} />
      </div>
    </div>
  );

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

  const entityBodyTemplate = ({ entityId }) => {
    const item = entity.entitiesMap[entityId];
    return (
      <>
        <div>{item.name}</div>
      </>
    );
  };

  const entityFilter = (value, filter) => {
    const item = entity.entitiesMap[value];
    return item.name.toLowerCase().includes(filter.toLowerCase());
  };

  const categoryBodyTemplate = ({ category }) => {
    return (
      <>
        <div>{CategoryLabelMap[category]}</div>
      </>
    );
  };

  const timeBodyTemplate = ({ time }) => {
    const formattedTime = new Date(time).toString();
    return (
      <>
        <div>{formattedTime}</div>
      </>
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

  return (
    <Card title={cardTitle}>
      {transaction.error && (
        <Message severity="error" text={transaction.error} style={{ display: 'block' }}></Message>
      )}
      {entity.error && (
        <Message severity="error" text={entity.error} style={{ display: 'block' }}></Message>
      )}
      {!(transaction.error || entity.error) && (transaction.isLoading || entity.isLoading) && (
        <Loader />
      )}
      {!(transaction.error || entity.error) && !(transaction.isLoading || entity.isLoading) && (
        <DataTable
          ref={dt}
          value={transaction.transactions}
          paginator
          rows={5}
          sortMode="multiple"
          removableSort
          emptyMessage="No transactions found."
          exportFilename="Transactions"
        >
          <Column
            field="entityId"
            header="Entity"
            body={entityBodyTemplate}
            sortable
            filter
            filterMatchMode="custom"
            filterFunction={entityFilter}
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
            body={categoryBodyTemplate}
            sortable
            filter
            filterMatchMode="contains"
            filterElement={<SelectFilter field="category" options={Categories} />}
          />
          <Column field="time" header="Time of Transaction" body={timeBodyTemplate} sortable />
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  entity: state.entity,
});

export default connect(mapStateToProps, { getTransactions, getEntities, addMultipleTransactions })(
  TransactionsTable,
);
