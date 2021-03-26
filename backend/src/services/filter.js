const {Op} = require('sequelize');

// sanitize the filter directive for database proxy
module.exports.sanitizeFilter = (filter) => {

    // time: {
    //     from: "datetime",
    //     to: "datetime"
    // },
    // entity: [],
    // category: [],
    // status: [],
    // paymentMode: [],
    // amount: {
    //     from: "integer",
    //     to: "integer"
    // }
    let filterDirective = {};

    const {time, amount, entity, category, status, paymentMode} = filter;

    if(entity && entity.length) {
        filterDirective.entityId = entity;
    } 

    if(category && category.length) {
        filterDirective.category = category;
    }

    if(paymentMode && paymentMode.length) {
        filterDirective.paymentMode = paymentMode;
    }

    if(status && status.length) {
        filterDirective.paymentStatus = status;
    }

    if(amount) {
        filterDirective.amount = {
            [Op.gte] : amount.from,
            [Op.lte]: amount.to
        }
    }

    if(time) {
        filterDirective.time = {
            [Op.gte] : time.from,
            [Op.lte]: time.to
        }
    }

    console.log(filterDirective)
    return filterDirective;

}


module.exports.filterResponse = (array, filterDirective) => {
    
    // console.log(filterDirective.entity);

    let result = array;
    if(filterDirective.entity) {
        result = filterByArray(result, filterDirective.entity, 'entityId');
    }

    if(filterDirective.category) {
        result = filterByArray(result, filterDirective.category, 'category');
    }

    if(filterDirective.status) {
        result = filterByArray(result, filterDirective.status, 'paymentStatus');
    }

    if(filterDirective.paymentMode) {
        result = filterByArray(result, filterDirective.paymentMode, 'paymentMode');
    }

    if(filterDirective.amount) {
        result = filterByRange(result, filterDirective.amount, 'amount');
    }

    if(filterDirective.time) {
        result = filterByRange(result, filterDirective.time, 'time');
    }

    return result;
}

const filterByArray = (array, requestKeyList, itemKey) => {

    let result = [];
    
    result = array.filter((item) => {
        return requestKeyList.includes(item[itemKey]);
    });
    
    return result;

}

const filterByRange = (array, requestKey, itemKey) => {

    const {from, to} = requestKey;

    let result = array;

    if(from) {
        result = result.filter((item) => {
            return item[itemKey] >= from;
        });
    }
    
    if(to) {
        result = result.filter((item) => {
            return item[itemKey] <= to;
        });
    }

    return result;

}


/*

    find entity by id

    filter by category, status, paymentMode

    filter by time

    filter by amount

    join table transaction(all), entity(name) - not now

    return table


*/