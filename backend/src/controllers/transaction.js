const transactions = require("../seed/transaction");
const sortResponse = require("../services/sorting").sortResponse;
const paginateResponse = require("../services/pagination").paginate;
const filterResponse = require("../services/filter").filterResponse;
const transactionProxy = require("../proxy/transaction");

module.exports.getTransactions = (req, res) => {
  console.log("transaction");

  res.send(transactions);
};

module.exports.getTransactionsWithFilter = (req, res) => {
  console.log(req.body);
  let response = transactions;

  const { sort, page, filter } = req.body;

  if (filter) {
    response = filterResponse(response, filter);
  }
  if (sort) {
    response = sortResponse(response, sort.key, sort.reverse);
  }
  if (page) {
    response = paginateResponse(response, page);
  }
  //  else {
  //     response = transactions;
  // }

  res.send(response);
};

// ========================= Version 2
// 1. Extract the payload
// 2. Send the payload
// 3. Decide which proxy or dao to use

const getAllTransactions = async (req, res) => {

  console.log(`get all transactions with user Id ${req.userId}`);
  const userId = req.userId;

  transactionProxy
    .findAll(userId)
    .then((value) => {
      res.status(200).send({
        error: false,
        data: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
        error: true,
        errorMessage: err.message,
      });
    });
};

const getTransactionById = async (req, res) => {
  const id = req.params.id;
  console.log(`get transactions of id ${id} with user Id ${req.userId}`);
  const userId = req.userId;

  transactionProxy
    .findById(id, userId)
    .then((value) => {
      if (value === null) {
        throw { code: 404, message: "Transaction does not exist" };
      }

      res.status(200).send({
        error: false,
        data: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
        error: true,
        errorMessage: err.message,
      });
    });
};

const updateTransactionById = async (req, res) => {
  const id = req.params.id;
  console.log(`update transactions of id: ${id} where user Id ${req.userId}`);
  const userId = req.userId;

  const transactionBody = req.body;

  transactionProxy
    .updateTransaction(transactionBody, id, userId)
    .then((value) => {
      res.status(200).send({
        error: false,
        data: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
        error: true,
        errorMessage: err.message,
      });
    });
};

const createTransaction = async (req, res) => {

  console.log(`create transactions having user Id ${req.userId}`);
  const userId = req.userId;

  let transaction = req.body;
  // inject userId in transaction
  transaction.userId = userId;

  transactionProxy
    .create(transaction)
    .then((value) => {
      res.status(201).send({
        error: false,
        transaction: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
        error: true,
        errorMessage: err.message,
      });
    });
};

const getTransactionsWithFilter = (req, res) => {
  const { sort, page, filter } = req.body;

  console.log(sort, page, filter, req.userId);

  transactionProxy
    .findWithFilter(filter, sort, page, req.userId)
    .then((value) => {
      res.status(200).send({
        error: false,
        data: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
        error: true,
        errorMessage: err.message,
      });
    });
};

const transactionController = {
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
  createTransaction,
  getTransactionsWithFilter,
};

module.exports = transactionController;
