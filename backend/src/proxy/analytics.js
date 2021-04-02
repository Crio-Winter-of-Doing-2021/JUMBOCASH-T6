const {Op} = require('sequelize');
const {Transaction} = require("../models/index");
const errorHandler = require("../services/handleErrors");
const sequelize = require("../../config/database");

async function getTotal(userId, startTime, endTime) {

    try {
        const inflow = 10, outflow = 20;

        const sum = await Transaction.findAll(
            {
                attributes: [
                    [sequelize.fn('SUM', sequelize.col('amount')), 'total'],
                    "category",
                    "paymentStatus"
                ],
                where: {
                    userId,
                    time: {
                        [Op.gte] : startTime,
                        [Op.lte]: endTime
                    }
                },
                group: ["category", "paymentStatus"]

            });

        return {
            "Inflow": inflow, 
            "Outflow": outflow,
            "response": sum
        };
    } catch(err) {
        errorHandler(err);
    }
}

module.exports = {
    getTotal: getTotal
}