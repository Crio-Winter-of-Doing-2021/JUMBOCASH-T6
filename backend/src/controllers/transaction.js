const transactions = require('../seed/transaction');
const sortResponse = require('../services/sorting').sortResponse;
const paginateResponse = require('../services/pagination').paginate;

module.exports.getTransactions = (req, res) => {

    console.log("transaction");

    res.send(transactions);
}

module.exports.getTransactionsWithFilter = (req, res) => {

    console.log(req.body);
    let response = [];

    const {sort, page, filter} = req.body;

    if(sort) {
        response = sortResponse(transactions, sort.key, sort.reverse)
    } if (page) {
        response = paginateResponse(transactions, page);
    } else {
        response = transactions;
    }

    res.send(response);
}