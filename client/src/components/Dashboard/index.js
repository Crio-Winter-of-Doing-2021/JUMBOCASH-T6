import React, { useState, useRef } from 'react';

import AnalyticsGrid from '../AnalyticsGrid';
import ItemsTabView from '../ItemsTabView';
import TransactionsTable from '../TransactionsTable';
import EntitiesTable from '../EntitiesTable';
import ActionsButton from '../ActionsButton';
import TransactionFormDialog from '../TransactionFormDialog';
import EntityFormDialog from '../EntityFormDialog';

import { DefaultEntity, DefaultTransaction } from '../../constants';
import Datepicker from '../Datepicker';

const Dashboard = () => {
  const [showTransactionFormDialog, setShowTransactionFormDialog] = useState(false);
  const [showEntityFormDialog, setShowEntityFormDialog] = useState(false);
  const [currTransaction, setCurrTransaction] = useState({});
  const [isTransactionEdit, setIsTransactionEdit] = useState(false);
  const [currEntity, setCurrEntity] = useState({});
  const [isEntityEdit, setIsEntityEdit] = useState(false);

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

  return (
    <> 
      <Datepicker />
      <AnalyticsGrid />
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
    </>
  );
};

export default Dashboard;
