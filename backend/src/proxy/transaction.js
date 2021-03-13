const Transaction = require("../models/transaction");
const validation = require("../services/validation");
const validateTransaction = require("../services/validateTransaction");
const { isUUIDV4 } = require("../services/validation");

var TransactionDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateTransaction: updateTransaction,
};

async function findAll() {
  return await Transaction.findAll();
}

async function findById(id) {
  // test for uuid
  if (validation.isUUIDV4(id)) {
    return await Transaction.findByPk(id);
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

    return await newTransaction.save();
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      throw {
        code: 422,
        message: "Either of the owner or the customer does not exist",
      };
    } else if (err.name === "SequelizeUniqueConstraintError") {
      throw { code: 409, message: "Transaction already exist" };
    } else {
      errorHandler(err);
    }
  }
}

async function updateTransaction(transaction, id) {
  // name, userId cannot be updated

  const { paymentMode, paymentStatus, amount } = transaction;

  try {

    if(! isUUIDV4(id)) {
      return false;
    }

    if (validateTransaction.isValidForUpdate(transaction)) {
      var updateTransaction = {
        paymentMode: paymentMode,
        amount: amount,
        paymentStatus: paymentStatus,
      };

      const isTransactionPresent = await Transaction.findByPk(id);

      if(isTransactionPresent === null ) {
        throw {code: 404, message: "Not found"}
      }

      return await Transaction.update(updateTransaction, { where: { id: id } });

    }
    
    return false;

  } catch (err) {
    errorHandler(err);
  }
}

function errorHandler(err) {
  if (err instanceof Error) {
    console.log(err);
    throw { code: 500, message: err };
  } else if (err.code) {
    throw err;
  } else {
    throw { code: 500, message: err };
  }
}

module.exports = TransactionDao;
