const { isUUIDV4 } = require("./validation");
const enums = require("../../config/data");
const errorHandler = require("./handleErrors");

const isValidTime = (time) => {
  // `2021-03-13 08:37:08 -06:-30`
  // from w3resources

  if (isNaN(Date.parse(time))) {
    throw { code: 422, message: "datetime does not conforms to guideline" };
  }

  return true;
};

isValidAmount = (amount) => {
  if (!amount) {
    throw { code: 422, message: "amount is empty" };
  } else if (isNaN(amount)) {
    throw { code: 422, message: "amount is not a number" };
  } else if ((amount * 100) % 1 != 0) {
    throw { code: 422, message: "amount takes number upto 2 decimal places" };
  }

  return true;
};

const isValidPaymentStatus = (paymentStatus) => {
  if (!paymentStatus) {
    throw { code: 422, message: "payment status is empty" };
  } else if (!enums.paymentStatusList.includes(paymentStatus)) {
    throw { code: 422, message: "payment status is not accepted" };
  }

  return true;
};

const isValidPaymentMode = (paymentMode) => {
  if (!paymentMode) {
    throw { code: 422, message: "payment mode is empty" };
  } else if (!enums.paymentModeList.includes(paymentMode)) {
    throw { code: 422, message: "payment mode is not accepted" };
  }

  return true;
};

const isValidCategory = (category) => {
  if (!category) {
    throw { code: 422, message: "category is empty" };
  } else if (!enums.categoryList.includes(category)) {
    throw { code: 422, message: "category is not accepted" };
  }
  return true;
};

const isValidTransaction = (transaction) => {
  const {
    id,
    userId,
    entityId,
    paymentMode,
    paymentStatus,
    amount,
    category,
    time,
  } = transaction;

  if (id && !isUUIDV4(id)) {
    return false;
  } else if (!(isUUIDV4(userId) && isUUIDV4(entityId))) {
    return false;
  } else if (time && !isValidTime(time)) {
    return false;
  } else if (
    !(
      isValidPaymentMode(paymentMode) &&
      isValidPaymentStatus(paymentStatus) &&
      isValidCategory(category)
    )
  ) {
    return false;
  } else if (!isValidAmount(amount)) {
    return false;
  }

  return true;
};

const isValidForUpdate = (updateTransaction) => {
  const { paymentMode, paymentStatus, amount } = updateTransaction;

  if (paymentMode !== undefined && !isValidPaymentMode(paymentMode)) {
    return false;
  } else if (
    paymentStatus !== undefined &&
    !isValidPaymentStatus(paymentStatus)
  ) {
    return false;
  } else if (amount && !isValidAmount(amount)) {
    return false;
  }

  return true;
};

const validateMultipleTransactions = (transactionList) => {

  // console.log(transactionList);

  let i = 0;
  try {
    for(let transaction of transactionList) {
      i += 1;
      if(!isValidTransaction(transaction)){
        return false
      }
    }
    return true;
  } catch (err) {
    err.message += ` in item ${i}`;
    errorHandler(err)
  }
}

module.exports = { isValidTransaction, isValidForUpdate, validateMultipleTransactions };
