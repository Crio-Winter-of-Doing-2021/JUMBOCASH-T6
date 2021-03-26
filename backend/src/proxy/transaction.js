const Transaction = require("../models/transaction");
const validation = require("../services/validation");
const validateTransaction = require("../services/validateTransaction");
const errorHandler = require('../services/handleErrors')


const { sanitizeFilter } = require("../services/filter");
const {sortResponse} = require("../services/sorting");

var TransactionDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateTransaction: updateTransaction,
  findWithFilter: findWithFilter
};

async function findAll() {
  try {
    return await Transaction.findAll();
  } catch (err) {
    errorHandler(err);
  }
}

async function findWithFilter(filter, sort, page) {

  try {
    let response =  await Transaction.findAll({
      where: {
        ...sanitizeFilter(filter)
      },
      order: 
        sortResponse(sort)
      
    });

    return response;

  } catch (err) {
    errorHandler(err);
  }
  
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

    if(! validation.isUUIDV4(id)) {
      return false;
    }

    if (validateTransaction.isValidForUpdate(transaction)) {

      let transaction = await Transaction.findByPk(id);

      if(transaction === null ) {
        throw {code: 404, message: "Not found"}
      }

      if(paymentStatus){
        transaction.paymentStatus = paymentStatus;
      } if(paymentMode) {
        transaction.paymentMode = paymentMode;
      } if(amount) {
        transaction.amount = amount;
      }
   
      return await transaction.save();

    }
    
    return false;

  } catch (err) {
    errorHandler(err);
  }
}

// function errorHandler(err) {
//   if (err instanceof Error) {
//     console.log(err);
//     throw { code: 500, message: err };
//   } else if (err.code) {
//     throw err;
//   } else {
//     // if someone's dog got lost or any other esoteric errors
//     throw { code: 500, message: err };
//   }
// }

module.exports = TransactionDao;
