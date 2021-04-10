import React from 'react';
import { connect } from 'react-redux';

import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { userFormSchema } from './validation';
import SaveButton from '../SaveButton';
import { getAvatarLabel } from '../../utils/getAvatarLabel';
import { updateUserInfo } from '../../store/actions/authActions';

const UserForm = ({ auth: { isUpdating, error }, initialValues }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: userFormSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await updateUserInfo(values);
      resetForm();
    },
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="profile-image p-my-3 bg-green-gradient">
        {getAvatarLabel(initialValues.name)}
      </div>
      <h1>My Profile</h1>
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-6">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            type="text"
            placeholder="Enter your name"
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <small id="name-help" className="p-error p-d-block">
              {formik.errors.name}
            </small>
          ) : null}
        </div>
        <div className="p-field p-col-6">
          <label htmlFor="companyName">Company Name</label>
          <InputText
            id="companyName"
            type="text"
            placeholder="Enter company name"
            {...formik.getFieldProps('companyName')}
          />
          {formik.touched.companyName && formik.errors.companyName ? (
            <small id="companyName-help" className="p-error p-d-block">
              {formik.errors.companyName}
            </small>
          ) : null}
        </div>
        <div className="p-field p-col-6">
          <label htmlFor="emailId">Email Id</label>
          <InputText
            id="emailId"
            type="text"
            placeholder="Enter your email id"
            {...formik.getFieldProps('emailId')}
          />
          {formik.touched.emailId && formik.errors.emailId ? (
            <small id="emailId-help" className="p-error p-d-block">
              {formik.errors.emailId}
            </small>
          ) : null}
        </div>
        <div className="p-field p-col-6">
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
      </div>
      <Divider />
      <div className="p-d-flex p-jc-end">
        <SaveButton isSubmitting={isUpdating} />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateUserInfo })(UserForm);
