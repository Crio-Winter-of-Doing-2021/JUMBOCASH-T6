module.exports.sortResponse = (array, key, reverse = false) => {

    array.sort((a,b) => {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    if(reverse === true) {
        array.reverse();
    }

    return array;

}