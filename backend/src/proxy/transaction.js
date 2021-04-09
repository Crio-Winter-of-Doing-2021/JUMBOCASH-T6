const Transaction = require("../models/transaction");
const validation = require("../services/validation");
const validateTransaction = require("../services/validateTransaction");
const errorHandler = require("../services/handleErrors");

const { sanitizeFilter } = require("../services/filter");
const { sortResponse } = require("../services/sorting");
const paginate = require("../services/pagination");

// 1. Gets data from postgres
// 2. Sends data to postgres
const visibleAttribute = ["id", "entityId", "category", "amount", "paymentStatus", "paymentMode", "time"];

var TransactionDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateTransaction: updateTransaction,
  findWithFilter: findWithFilter,
  addMultipleTransactions: addMultipleTransactions
};

async function findAll(userId) {
  try {
    return await Transaction.findAll({
      attributes: visibleAttribute,
      where: {userId}
    });
  } catch (err) {
    errorHandler(err);
  }
}

async function findWithFilter(filter, sort, page, userId) {
  try {
    let response = await Transaction.findAll({
      attributes: visibleAttribute,
      where: {
        ...sanitizeFilter(filter),
        userId
      },
      order: sortResponse(sort),
      ...paginate(page)
    });

    return response;
  } catch (err) {
    errorHandler(err);
  }
}

async function findById(id, userId) {
  // test for uuid
  if (validation.isUUIDV4(id)) {
    return await Transaction.findOne({
      attributes: visibleAttribute,
      where: {id, userId}
    });
  }
}

async function deleteById(id) {
  return await Transaction.destroy({ where: { id: id } });
}

async function create(transaction) {
  try {

    if (validateTransaction.isValidTransaction(transaction)) {
      var newTransaction = new Transaction(transaction);
    }

    // check for duplicate transaction, where we can check for duplicate transaction
    const duplicateTransaction = await Transaction.findOne({ where: { 
      time: newTransaction.time,
      entityId: newTransaction.entityId,
      userId: newTransaction.userId
    } });

    if (duplicateTransaction !== null) {
        throw {code: 409, message: "Transaction already exist"}
    }
    
    return await newTransaction.save();

  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      throw {
        code: 422,
        message: "Either of the owner or the customer does not exist",
      };
    } else {
      errorHandler(err);
    }
  }
}

async function updateTransaction(transaction, id, userId) {
  // name, userId cannot be updated

  const { paymentMode, paymentStatus, amount } = transaction;

  try {
    if (!validation.isUUIDV4(id)) {
      return false;
    }

    if (validateTransaction.isValidForUpdate(transaction)) {
      let transaction = await Transaction.findOne({where: {id, userId}});

      if (transaction === null) {
        throw { code: 404, message: "Not found" };
      }

      if (paymentStatus) {
        transaction.paymentStatus = paymentStatus;
      }
      if (paymentMode) {
        transaction.paymentMode = paymentMode;
      }
      if (amount) {
        transaction.amount = amount;
      }

      return await transaction.save();
    }

    return false;
  } catch (err) {
    errorHandler(err);
  }
}

async function addMultipleTransactions(transactionList) {

  try {

    let validatedTransactionList = validateTransaction.validateMultipleTransactions(transactionList);

    return await Transaction.bulkCreate(validatedTransactionList, {returning: true, ignoreDuplicates: true });
    // ignoreDuplicates works in postgres > 9.5
  }
    catch(err) {
      errorHandler(err);
    }
}


module.exports = TransactionDao;
