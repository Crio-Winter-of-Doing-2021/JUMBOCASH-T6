const { Op } = require("sequelize");
const { Transaction } = require("../models/index");
const errorHandler = require("../services/handleErrors");
const sequelize = require("../../config/database");
const analyse = require("../services/analytics");
const getInterval = require("../services/getInterval").getInterval; 

async function getTotalCashFlow(userId, startTime, endTime) {
  try {
    const totalByCategoryAndStatus = await Transaction.findAll({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
        [sequelize.fn("COUNT", sequelize.col("amount")), "countTransactions"],
        "category",
        "paymentStatus",
      ],
      where: {
        userId,
        time: {
          [Op.gte]: startTime,
          [Op.lte]: endTime,
        },
      },
      group: ["category", "paymentStatus"],
    });

    return analyse.analyseTotalOutflowInflow(totalByCategoryAndStatus);
  } catch (err) {
    errorHandler(err);
  }
}

async function getEntityAnalytics(userId, startTime, endTime) {

  try {
    const entityData = await Transaction.findAll({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
        [sequelize.fn("COUNT", sequelize.col("amount")), "countTransactions"],
        "entityId",
        "paymentStatus",
        "category"
      ],
      where: {
        userId,
        time: {
          [Op.gte]: startTime,
          [Op.lte]: endTime,
        },
      },
      group: ["entityId", "category", "paymentStatus"],
      order: [sequelize.literal('"totalAmount" DESC')]
    });

    return analyse.analyseTotalOutflowInflow(entityData);
    

  } catch (err) {
    errorHandler(err);
  }
}

async function getTrend(userId, interval) {

  // get last 6 intervals data
  try {

    const {startTime, endTime} = getInterval(interval);

    const trendData = await Transaction.findAll({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
        [sequelize.fn("COUNT", sequelize.col("amount")), "countTransactions"],
        [sequelize.fn('date_trunc', interval, sequelize.col('time')), "startTime" ],
        "paymentStatus",
        "category"
      ],
      where: {
        userId,
        time: {
          [Op.gte]: startTime,
          [Op.lte]: endTime,
        },
      },
      group: ["category", "paymentStatus", sequelize.literal('"startTime"')],
      order: [sequelize.literal('"startTime" DESC')]
    });

    let trends = analyse.analyseTotalOutflowInflow(trendData);
    trends.message = `Trend since last 6 ${interval}s`;

    return trends;

  } catch (err) {
    errorHandler(err);
  }
}

module.exports = {
  getTotalCashFlow: getTotalCashFlow,
  getEntityAnalytics: getEntityAnalytics,
  getTrend: getTrend
};
