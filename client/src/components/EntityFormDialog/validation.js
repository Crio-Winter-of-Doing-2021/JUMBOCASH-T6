import * as Yup from 'yup';

export const entityFormSchema = Yup.object({
  name: Yup.string()
    .max(200, 'Name cannot be longer than 200 characters')
    .required('Name cannot be left empty')
    .matches(/^[^0-9]+.*/, 'Name should not begin with a number'),
  address: Yup.string().required('Address cannot be left empty'),
  contact: Yup.string()
    .required('Contact cannot be left empty')
    .matches(/^[0-9]+$/, 'Invalid contact number')
    .min(10,'Minimum length is 10'),
});
