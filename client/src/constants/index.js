export const BASE_URL = 'https://jumbocash-dev.herokuapp.com/api';
export const GOOGLE_AUTH_LINK = BASE_URL+'/auth/google';

export const PaymentModes = [
  { label: 'Cash', value: 'CASH' },
  { label: 'Debit Card', value: 'DEBIT_CARD' },
  { label: 'Credit Card', value: 'CREDIT_CARD' },
  { label: 'UPI', value: 'UPI' },
];

export const PaymentModeLabelMap = {
  'CASH':'Cash',
  'DEBIT_CARD':'Debit Card',
  'CREDIT_CARD':'Credit Card',
  'UPI':'UPI'
}

export const PaymentStatuses = [
  { label: 'Paid', value: 'PAID' },
  { label: 'Not Paid', value: 'NOT_PAID' },
];

export const PaymentStatusLabelMap = {
  'PAID': 'Paid',
  'NOT_PAID': 'Not Paid',
};

export const Categories = [
  { label: 'Sales', value: 'SALES' },
  { label: 'Purchase', value: 'PURCHASE' },
  { label: 'Employee', value: 'EMPLOYEE' },
  { label: 'Tax', value: 'TAX' },
  { label: 'Asset Liquidation', value: 'ASSET_LIQUIDATION' },
];

export const CategoryLabelMap = {
  'SALES':'Sales',
  'PURCHASE': 'Purchase',
  'EMPLOYEE': 'Employee',
  'TAX': 'Tax',
  'ASSET_LIQUIDATION':'Asset Liquidation'
}

export const Intervals = [
  { label: 'Weeks', value: 'week' },
  { label: 'Months', value: 'month' },
  { label: 'Quarters', value: 'quarter' },
  { label: 'Years', value: 'year' },
]

export const TransactionTableHeaderLabelMap = {
  'Amount' : 'amount',
  'Category' : 'category',
  'Entity' : 'entityId',
  'Payment Mode': 'paymentMode',
  'Payment Status': 'paymentStatus',
  'Time of Transaction': 'time'
}

export const DefaultTransaction = {
  amount: 0,
  time: Date.now(),
  paymentStatus: '',
  paymentMode: '',
  category: '',
  entityId: '',
  remarks: '',
};

export const DefaultEntity = {
  name: '',
  address: '',
  contact: '',
}