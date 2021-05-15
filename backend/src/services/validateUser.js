const validation = require('./validation')
const isValidUserForUpdate = (user) => {

    if(! user.contact && validation.isValidContact(user.contact)){
        throw {code: 422, message: 'contact cannot be left empty'};
    } else if(user.companyName == "") {
        throw {code: 422, message: 'Company name cannot be left empty'}
    }

    return true;
}

module.exports = {
    isValidUserForUpdate
}