export const FACEBOOK_AUTH_LINK = 'https://localhost:5000/auth/facebook';
export const GOOGLE_AUTH_LINK = 'https://localhost:5000/auth/google';

export const PaymentModes = [
  { label: 'Cash', value: 'CASH' },
  { label: 'Debit Card', value: 'DEBIT_CARD' },
  { label: 'Credit Card', value: 'CREDIT_CARD' },
  { label: 'UPI', value: 'UPI' },
];

export const PaymentStatuses = [
  { label: 'Paid', value: 'PAID' },
  { label: 'Not Paid', value: 'NOT_PAID' },
];

export const Categories = [
  { label: 'Sales', value: 'SALES' },
  { label: 'Purchase', value: 'PURCHASE' },
  { label: 'Employee', value: 'EMPLOYEE' },
  { label: 'Tax', value: 'TAX' },
  { label: 'Asset Liquidation', value: 'ASSET_LIQUIDATION' },
];

export const Entities = [
  // will be populated from backend
  { id: '12345', userId: '34567', name: 'Entity1', address: 'West Bengal, India', contact: '9876543210' },
  { id: '67890', userId: '89215', name: 'Entity2', address: 'Assam, India', contact: '8876542310' },
];
