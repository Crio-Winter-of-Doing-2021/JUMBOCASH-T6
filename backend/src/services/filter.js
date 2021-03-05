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