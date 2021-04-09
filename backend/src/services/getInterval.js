const moment = require('moment');
const enums = require("../../config/data");

function getInterval(interval) {


    if(! enums.trendIntervals.includes(interval)) {
        throw {code: 422, message: "Interval not allowed"}
    }
    
    const d = new Date();
    const endTime = d.toISOString();
    const startTime = moment(endTime).subtract(6, interval);

    return {startTime, endTime};
}

module.exports = {
    getInterval: getInterval
}