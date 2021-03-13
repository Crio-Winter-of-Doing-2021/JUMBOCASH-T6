import React from 'react';
import { connect } from 'react-redux';

import { addEntity } from '../../store/actions/entityActions';

import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useFormik } from 'formik';
import { entityFormSchema } from './validation';
import SaveButton from '../SaveButton/SaveButton';


const EntityFormDialog = ({ addEntity, entity:{isLoading,error}, visible, onHide }) => {
  
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      contact: '',
    },
    validationSchema: entityFormSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      await addEntity(values);
      resetForm();
      onHide(false);
    },
  });


  return (
    <form onSubmit={formik.handleSubmit}>
      <Dialog
        header="Add New Enitity"
        visible={visible}
        style={{ width: '50vw' }}
        footer={<SaveButton isSubmitting={isLoading} />}
        onHide={() => onHide(false)}
        dismissableMask={true}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              type="text"
              placeholder="Enter a name for the entity"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <small id="name-help" className="p-error p-d-block">
                {formik.errors.name}
              </small>
            ) : null}
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="contact">Contact Number</label>
            <InputText
              id="contact"
              type="text"
              placeholder="Enter entity's contact number"
              {...formik.getFieldProps('contact')}
            />
            {formik.touched.contact && formik.errors.contact ? (
              <small id="contact-help" className="p-error p-d-block">
                {formik.errors.contact}
              </small>
            ) : null}
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="address">Address</label>
            <InputTextarea
              id="address"
              type="text"
              rows="3"
              placeholder="Enter entity's address"
              {...formik.getFieldProps('address')}
            />
            {formik.touched.address && formik.errors.address ? (
              <small id="address-help" className="p-error p-d-block">
                {formik.errors.address}
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
});

export default connect(mapStateToProps, { addEntity })(EntityFormDialog);
