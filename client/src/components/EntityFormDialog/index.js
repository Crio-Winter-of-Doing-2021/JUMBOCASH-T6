import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import { addEntity, editEntity } from '../../store/actions/entityActions';

import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useFormik } from 'formik';
import { entityFormSchema } from './validation';
import SaveButton from '../SaveButton';

const EntityFormDialog = ({
  addEntity,
  editEntity,
  entity: { isUpdating, updateError },
  visible,
  onHide,
  initialValues,
  isEdit,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema: entityFormSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      isEdit ? editEntity(initialValues.id, values) : addEntity(values);
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Dialog
        header={`${isEdit ? 'Edit Entity' : 'Add New Entity'}`}
        visible={visible}
        style={{ width: '50vw' }}
        footer={<SaveButton isSubmitting={isUpdating} />}
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

export default connect(mapStateToProps, { addEntity, editEntity })(EntityFormDialog);
