import * as Yup from 'yup';
import { PaymentStatuses,PaymentModes, Categories } from '../../constants';

export const transactionFormSchema = Yup.object({
  amount: Yup.number().moreThan(0,'Amount cannot be 0'),
  time: Yup.date().required('Date/Time cannot be empty'),
  paymentStatus: Yup.string()
    .oneOf(PaymentStatuses.map((item)=>item.value), 'Invalid Payment Type')
    .required('Payment Status cannot be left unselected'),
  paymentMode: Yup.string()
    .oneOf(PaymentModes.map((item)=>item.value), 'Invalid Payment Mode')
    .required('Payment Mode cannot be left unselected'),
  category: Yup.string()
    .oneOf(Categories.map((item)=>item.value), 'Invalid Category')
    .required('Category cannot be left unselected'),
  entityId: Yup.string().required('Entity cannot be left unselected'),
  remarks: Yup.string()
});
