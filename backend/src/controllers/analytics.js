const analyticsProxy = require("../proxy/analytics");

async function getTotalFlow (req, res) {
    
  const userId = req.userId;
  const {from, to} = req.body.time;

  console.log(`get total cash flow from ${from} to ${to} for ${userId}`);

  analyticsProxy
    .getTotalCashFlow(userId, from, to)
    .then((value) => {
      res.status(200).send({
        error: false,
        analytics: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
          error: true,
          errorMessage: err.message,
      });
    });
}

async function getEntityAnalytics (req, res) {

  const userId = req.userId;
  const {from, to} = req.body.time;

  console.log(`get entity analytics from ${from} to ${to} for ${userId}`);

  analyticsProxy
    .getEntityAnalytics(userId, from, to)
    .then((value) => {
      res.status(200).send({
        error: false,
        analytics: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
          error: true,
          errorMessage: err.message,
      });
    });
}

async function getTrend (req, res) {

  const userId = req.userId;
  // const {from, to} = req.body.time;
  const interval = req.body.interval;

  console.log(`get trends for ${userId} for last 6 ${interval}s`);

  analyticsProxy
    .getTrend(userId, interval)
    .then((value) => {
      res.status(200).send({
        error: false,
        analytics: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
          error: true,
          errorMessage: err.message,
      });
    });
}

module.exports = {
    getTotalFlow: getTotalFlow,
    getEntityAnalytics: getEntityAnalytics,
    getTrend: getTrend
}