const errorHandler = require("../services/handleErrors");
const analyticsProxy = require("../proxy/analytics");

async function getTotalFlow (req, res) {
    
  const userId = req.userId;
  const {from, to} = req.body.time;

  console.log(`get total cash flow from ${from} to ${to} for ${userId}`);

  analyticsProxy
    .getTotal(userId, from, to)
    .then((value) => {
      res.status(200).send({
        error: false,
        analytics: value,
      });
    })
    .catch((err) => {
      errorHandler(err)
    });
}

module.exports = {
    getTotal: getTotalFlow
}