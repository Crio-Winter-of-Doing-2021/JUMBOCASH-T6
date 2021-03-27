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
  transactionProxy
    .findAll()
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

  transactionProxy
    .findById(id)
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

  const transactionBody = req.body;

  transactionProxy
    .updateTransaction(transactionBody, id)
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
  transactionProxy
    .create(req.body)
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

  console.log(sort, page, filter);

  transactionProxy
    .findWithFilter(filter, sort, page)
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
