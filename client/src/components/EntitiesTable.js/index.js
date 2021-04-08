import React, { useRef } from 'react';
import { connect } from 'react-redux';

import { getEntities } from '../../store/actions/entityActions';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import Loader from '../Loader';


const EntitiesTable = ({
  entity:{isLoading,isUpdating,entities,error},
  getEntities,
  editEntityDialog,
}) => {
  const dt = useRef(null);
  
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-outlined p-button-info"
          iconPos="left"
          label="Edit"
          onClick={() => editEntityDialog(rowData)}
        />
      </>
    );
  };
  const cardTitle = (
    <div className="p-card-title p-d-flex">
      List of Entities
      <Button
        type="Button"
        icon="pi pi-refresh"
        className="p-ml-auto"
        tooltip="Refresh"
        onClick={getEntities}
      />
    </div>
  );
  return (
    <Card title={cardTitle}>
      {error && (
        <Message severity="error" text={error} style={{ display: 'block' }}></Message>
      )}
      {!error && isLoading && (
        <Loader />
      )}
      {!error && !isLoading && (
        <DataTable
          ref={dt}
          value={entities}
          paginator
          rows={5}
          sortMode="multiple"
          removableSort
          emptyMessage="No entities found."
        >
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by name"
          />
          <Column
            field="address"
            header="Address"
            sortable
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by address"
          />
          <Column
            field="contact"
            header="Contact Number"
            sortable
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by contact"
          />
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  entity: state.entity,
});

export default connect(mapStateToProps, { getEntities })(EntitiesTable);
