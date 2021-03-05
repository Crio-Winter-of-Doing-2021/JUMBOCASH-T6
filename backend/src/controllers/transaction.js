const transactions = require('../seed/transaction');
const sortResponse = require('../services/sorting').sortResponse;
const paginateResponse = require('../services/pagination').paginate;
const filterResponse = require('../services/filter').filterResponse;

module.exports.getTransactions = (req, res) => {

    console.log("transaction");

    res.send(transactions);
}

module.exports.getTransactionsWithFilter = (req, res) => {

    console.log(req.body);
    let response = transactions;

    const {sort, page, filter} = req.body;

    if(filter) {
        response = filterResponse(response, filter);
    } if(sort) {
        response = sortResponse(response, sort.key, sort.reverse)
    } if (page) {
        response = paginateResponse(response, page);
    }
    //  else {
    //     response = transactions;
    // }

    res.send(response);
}