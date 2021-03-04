module.exports.paginate = (array, pageDirective) => {

    let {cursor, flow, limit} = pageDirective;
    // console.log(cursor, flow, limit);
    let startIndex = 0, endIndex = array.length-1, index = -1;
    
    limit = Number(limit);

    if(cursor) {
        index = array.findIndex(function(item) {
            return item.id == cursor.id;
        });
    }

    if(index > -1) {
        if(flow === "end") {
            [startIndex, endIndex] = [Math.max(index-limit, 0), index];
        } else if (flow === "start") {
            [startIndex, endIndex] = [index, Math.min(index+limit, endIndex)];
        }
    } else {
        if(flow === "end") {
            index = endIndex;
            [startIndex, endIndex] = [Math.max(index-limit, 0), index];
        } else if (flow === "start") {
            index = startIndex;
            [startIndex, endIndex] = [index, Math.min(index+limit, endIndex)];
        }
    }

    // console.log(index, startIndex, endIndex+1);

    return array.slice(startIndex, endIndex+1);

}