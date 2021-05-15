import * as Yup from 'yup';

export const userFormSchema = Yup.object({
  name: Yup.string()
    .max(200, 'Name cannot be longer than 200 characters')
    .required('Name cannot be left empty')
    .matches(/^[^0-9]+.*/, 'Name should not begin with a number'),
  companyName: Yup.string().required('Company cannot be left empty'),
  emailId: Yup.string().email().required('Email Id cannot be left empty'),
  contact: Yup.string()
    .required('Contact cannot be left empty')
    .matches(/^[0-9]+$/, 'Invalid contact number'),
});
