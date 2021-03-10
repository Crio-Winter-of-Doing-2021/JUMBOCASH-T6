const isUUIDV4 = (uuid) => {

    var pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (! pattern.test(uuid)) {
        throw {code: 422, message: "parameter is Not a UUID"};
    }

    return true;
}

const isValidEntity = (entity) => {

    const {userId, name, address, contact} = entity;

    if(! (userId && name && address && contact)) {
        throw {code: 422, message: "Undefined field detected"};
    }
    
    return true;
}

const isPresent = (key) => {

    if(key) {
        return true;
    }
    return false;
}

const validation = {
    isUUIDV4,
    isValidEntity
}

module.exports = validation;