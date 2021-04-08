import React, { useState } from 'react';

import CashflowSummaryCard from '../CashflowSummaryCard';
import TopEntitiesCard from '../TopEntitiesCard';
import MonthlyTransactionsCard from '../MonthlyTransactionsCard';

import TransactionsTable from '../TransactionsTable.js';
import ActionsButton from '../ActionsButton';
import TransactionFormDialog from '../TransactionFormDialog';
import EntityFormDialog from '../EntityFormDialog';
import { DefaultEntity, DefaultTransaction } from '../../constants';
import ItemsTabView from '../ItemsTabView';
import EntitiesTable from '../EntitiesTable.js';
import AddMultipleItemsDialog from '../AddMultipleItemsDialog';

const Dashboard = () => {
  const [showTransactionFormDialog, setShowTransactionFormDialog] = useState(false);
  const [showEntityFormDialog, setShowEntityFormDialog] = useState(false);
  const [showAddMultipleItemsDialog, setAddMultipleItemsDialog] = useState(false);
  const [currTransaction, setCurrTransaction] = useState({});
  const [isTransactionEdit, setIsTransactionEdit] = useState(false);
  const [currEntity, setCurrEntity] = useState({});
  const [isEntityEdit, setIsEntityEdit] = useState(false);
  const [isMultipleEntity, setIsMultipleEntity] = useState(false);

  const addOrEditTransactionDialog = (data) => {
    data ? setIsTransactionEdit(true) : setIsTransactionEdit(false);
    setCurrTransaction(data || DefaultTransaction);
    setShowTransactionFormDialog(true);
  };

  const addOrEditEntityDialog = (data) => {
    data ? setIsEntityEdit(true) : setIsEntityEdit(false);
    setCurrEntity(data || DefaultEntity);
    setShowEntityFormDialog(true);
  };

  const addMultipleItemsDialog = (isMultipleEntity) => {
    isMultipleEntity ? setIsMultipleEntity(true) : setIsMultipleEntity(false);
    setAddMultipleItemsDialog(true);
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
      <ItemsTabView
        items={[
          {
            header: 'Transactions',
            content: <TransactionsTable editTransactionDialog={addOrEditTransactionDialog} />,
          },
          {
            header: 'Entities',
            content: <EntitiesTable editEntityDialog={addOrEditEntityDialog} />,
          },
        ]}
      />
      <ActionsButton
        addTransactionDialog={addOrEditTransactionDialog}
        addEntityDialog={addOrEditEntityDialog}
        addMultipleItemsDialog={addMultipleItemsDialog}
      />
      <TransactionFormDialog
        visible={showTransactionFormDialog}
        onHide={setShowTransactionFormDialog}
        initialValues={currTransaction}
        isEdit={isTransactionEdit}
      />
      <EntityFormDialog
        visible={showEntityFormDialog}
        onHide={setShowEntityFormDialog}
        initialValues={currEntity}
        isEdit={isEntityEdit}
      />
      <AddMultipleItemsDialog
        visible={showAddMultipleItemsDialog}
        onHide={setAddMultipleItemsDialog}
        isEntity={isMultipleEntity}
      />
    </>
  );
};

export default Dashboard;
