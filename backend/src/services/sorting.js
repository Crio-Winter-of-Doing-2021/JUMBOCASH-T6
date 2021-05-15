
module.exports.sortResponse = (sort) => {

    let {key, reverse} = sort;

    if(!key) {
        key = "amount"
    }

    if(reverse === undefined || !reverse) {
        reverse = "ASC"
    } else {
        reverse = "DESC"
    }

    return [[key, reverse]];
    
}


const sortResponse1 = (array, key, reverse = false) => {

    array.sort((a,b) => {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    if(reverse === true) {
        array.reverse();
    }

    return array;

}
