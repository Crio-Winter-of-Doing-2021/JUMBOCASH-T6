import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { addTransaction, editTransaction } from '../../store/actions/transactionActions';
import { getEntities } from '../../store/actions/entityActions';

import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';

import { PaymentStatuses, PaymentModes, Categories } from '../../constants';
import SaveButton from '../SaveButton';
import { useFormik } from 'formik';
import { transactionFormSchema } from './validation';

const TransactionFormDialog = ({
  entity: { entities },
  getEntities,
  addTransaction,
  editTransaction,
  transaction: { isUpdating, updateError },
  visible,
  onHide,
  initialValues,
  isEdit,
}) => {
  useEffect(() => {
    getEntities();
  }, []);

  initialValues.time = new Date(initialValues.time);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: transactionFormSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      isEdit ? editTransaction(initialValues.id, values) : addTransaction(values);
    },
    enableReinitialize: true,
  });

  // Reset form and close dialog only if there is no error
  useEffect(() => {
    if (!updateError && !isUpdating) {
      formik.resetForm();
      onHide(false);
    }
  }, [updateError, isUpdating]);

  const entityTemplate = (option) => {
    return (
      <>
        <div className="p-text-bold">{option.name}</div>
        <div className="p-text-light">
          {option.address} | {option.contact}
        </div>
      </>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Dialog
        header={`${isEdit ? 'Edit Transaction' : 'Add New Transaction'}`}
        visible={visible}
        style={{ width: '50vw' }}
        footer={<SaveButton isSubmitting={isUpdating} />}
        onHide={() => {
          onHide(false);
        }}
        dismissableMask={true}
      >
        {!entities.length && (
          <Message
            severity="warn"
            text="No entities present, please add an entity before adding a new transaction"
            style={{ display: 'block' }}
            className="p-mb-2"
          ></Message>
        )}
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-6 p-mb-4">
            <label htmlFor="amount">Amount</label>
            <InputNumber
              id="amount"
              mode="currency"
              currency="INR"
              placeholder="Enter the transaction amount"
              {...formik.getFieldProps('amount')}
              onChange={(e) => {
                e.value && formik.setFieldValue('amount', e.value);
              }}
            />
            {formik.touched.amount && formik.errors.amount ? (
              <small id="amount-help" className="p-error p-d-block">
                {formik.errors.amount}
              </small>
            ) : null}
          </div>
          <div className="p-field p-col-12 p-md-6 p-mb-4">
            <label htmlFor="time">Date/Time</label>
            <Calendar
              inputId="time"
              showTime
              hourFormat="24"
              hideOnDateTimeSelect
              placeholder="Select date/time of transaction"
              showIcon={true}
              baseZIndex={1}
              appendTo={document.body}
              {...formik.getFieldProps('time')}
            />
            {formik.touched.time && formik.errors.time ? (
              <small id="time-help" className="p-error p-d-block">
                {formik.errors.time}
              </small>
            ) : null}
          </div>
          <div className="p-field p-col-12 p-md-6 p-mb-4">
            <label htmlFor="paymentStatus">Select Transaction Status</label>
            <Dropdown
              filter={true}
              inputId="paymentStatus"
              options={PaymentStatuses}
              placeholder="Select status for the transaction"
              {...formik.getFieldProps('paymentStatus')}
            />
            {formik.touched.paymentStatus && formik.errors.paymentStatus ? (
              <small id="paymentStatus-help" className="p-error p-d-block">
                {formik.errors.paymentStatus}
              </small>
            ) : null}
          </div>
          <div className="p-field p-col-12 p-md-6 p-mb-4">
            <label htmlFor="paymentMode">Select Transaction Mode</label>
            <Dropdown
              filter={true}
              inputId="paymentMode"
              options={PaymentModes}
              placeholder="Select mode of the transaction"
              {...formik.getFieldProps('paymentMode')}
            />
            {formik.touched.paymentMode && formik.errors.paymentMode ? (
              <small id="paymentMode-help" className="p-error p-d-block">
                {formik.errors.paymentMode}
              </small>
            ) : null}
          </div>
          <div className="p-field p-col-12 p-md-6 p-mb-4">
            <label htmlFor="category">Select Category</label>
            <Dropdown
              filter={true}
              inputId="category"
              options={Categories}
              placeholder="Select a category for transaction"
              {...formik.getFieldProps('category')}
            />
            {formik.touched.category && formik.errors.category ? (
              <small id="category-help" className="p-error p-d-block">
                {formik.errors.category}
              </small>
            ) : null}
          </div>
          <div className="p-field p-col-12 p-md-6 p-mb-4">
            <label htmlFor="entityId">Select Entity</label>
            <Dropdown
              filter={true}
              inputId="entityId"
              options={entities}
              optionLabel="name"
              optionValue="id"
              itemTemplate={entityTemplate}
              filterBy="name,address"
              placeholder="Select an entity"
              baseZIndex={1}
              appendTo={document.body}
              {...formik.getFieldProps('entityId')}
            />
            {formik.touched.entityId && formik.errors.entityId ? (
              <small id="entityId-help" className="p-error p-d-block">
                {formik.errors.entityId}
              </small>
            ) : null}
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="remarks">Remarks(optional)</label>
            <InputTextarea id="remarks" type="text" rows="3" {...formik.getFieldProps('remarks')} />
            {formik.touched.remarks && formik.errors.remarks ? (
              <small id="remarks-help" className="p-error p-d-block">
                {formik.errors.remarks}
              </small>
            ) : null}
          </div>
        </div>
        <Divider />
      </Dialog>
    </form>
  );
};

const mapStateToProps = (state) => ({
  entity: state.entity,
  transaction: state.transaction,
});

export default connect(mapStateToProps, { addTransaction, editTransaction, getEntities })(
  TransactionFormDialog,
);
