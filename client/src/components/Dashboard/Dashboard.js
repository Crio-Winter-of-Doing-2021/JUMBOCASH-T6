import React, { useState } from 'react';


import CashflowSummaryCard from '../CashflowSummaryCard/CashflowSummaryCard';
import TopEntitiesCard from '../TopEntitiesCard/TopEntitiesCard';
import MonthlyTransactionsCard from '../MonthlyTransactionsCard/MonthlyTransactionsCard';

import TransactionsTable from '../TransactionsTable.js/TransactionsTable';
import ActionsButton from '../ActionsButton/ActionsButton';
import TransactionFormDialog from '../TransactionFormDialog/TransactionFormDialog';
import EntityFormDialog from '../EntityFormDialog/EntityFormDialog';

const Dashboard = () => {
  const [showTransactionFormDialog, setShowTransactionFormDialog] = useState(false);
  const [showEntityFormDialog, setShowEntityFormDialog] = useState(false);
  const [currTransaction, setCurrTransaction] = useState({});
  const [isTransactionEdit, setIsTransactionEdit] = useState(false);
  

  const addOrEditTransactionDialog = (data) => {
    data ? setIsTransactionEdit(true) : setIsTransactionEdit(false);
    setCurrTransaction(
      data || {
        amount: 0,
        time: '',
        paymentStatus: '',
        paymentMode: '',
        category: '',
        entityId: '',
        remarks: '',
      },
    );
    setShowTransactionFormDialog(true);
  };

  return (
    <>
      <div className="p-grid nested-grid p-mb-3">
        <div className="p-col-12 p-md-12 p-lg-4">
          <CashflowSummaryCard />
        </div>
        <div className="p-col-12 p-md-6 p-lg-4">
          <TopEntitiesCard />
        </div>
        <div className="p-col-12 p-md-6 p-lg-4">
          <MonthlyTransactionsCard />
        </div>
      </div>
      <TransactionsTable editTransactionDialog={addOrEditTransactionDialog} />
      <ActionsButton
        addTransactionDialog={addOrEditTransactionDialog}
        setShowEntityFormDialog={setShowEntityFormDialog}
      />
      <TransactionFormDialog
        visible={showTransactionFormDialog}
        onHide={setShowTransactionFormDialog}
        initialValues={currTransaction}
        isEdit={isTransactionEdit}
      />
      <EntityFormDialog visible={showEntityFormDialog} onHide={setShowEntityFormDialog} />
    </>
  );
};


export default Dashboard;
