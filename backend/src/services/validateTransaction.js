const { isUUIDV4 } = require("./validation");


const isValidTime = (time) => {
    // `2021-03-13T08:37:08.201Z`
    return true;
}

isValidAmount = (amount) => {

    if(! amount) {
        throw {code: 422, message: "amount is empty"}
    } else if (isNaN(amount)) {
        throw {code: 422, message: "amount is not a number"}
    }

    return true;
}

const isValidPaymentStatus = (paymentStatus) => {
    
    var paymentStatusList = ["PAID", "NOT_PAID"];

    if(!paymentStatus) {
        throw {code: 422, message: "payment status is empty"}
    }else if (! paymentStatusList.includes(paymentStatus)) {
        throw {code: 422, message: "payment status is not accepted"}
    }

    return true;
}

const isValidPaymentMode = (paymentMode) => {
    
    var paymentModeList = ["CASH", "DEBIT_CARD"," CREDIT_CARD", "UPI"];

    if(!paymentMode) {
        throw {code: 422, message: "payment mode is empty"}
    }else if (! paymentModeList.includes(paymentMode)) {
        throw {code: 422, message: "payment mode is not accepted"}
    }

    return true;
}

const isValidCategory = (category) => {
    
    var categoryList = ["SALES", "PURCHASE", "EMPLOYEE", "TAX", "ASSET_LIQUIDATION"];

    if(!category) {
        throw {code: 422, message: "category is empty"}
    } else if (! categoryList.includes(category)) {
        throw {code: 422, message: "category is not accepted"}
    }
    return true;
}


const isValidTransaction = (transaction) => {

    const {id, userId, entityId, createdAt, paymentMode, paymentStatus, amount, category} = transaction;

    if(id && !isUUIDV4(id)) {
        return false;
    } else if(! (isUUIDV4(userId) && isUUIDV4(entityId))) {
        return false;
    } else if (createdAt && !isValidTime(createdAt)) {
        return false;
    } else if(! (isValidPaymentMode(paymentMode) && isValidPaymentStatus(paymentStatus) && isValidCategory(category))) {
        return false
    } else if (! isValidAmount(amount)) {
        return false;
    }

    return true;
}

const isValidForUpdate = (updateTransaction) => {

    const {paymentMode, paymentStatus, amount} = updateTransaction;
    
    if(paymentMode !== undefined && !isValidPaymentMode(paymentMode)) {
        return false;
    } else if(paymentStatus!== undefined && !isValidPaymentStatus(paymentStatus)) {
        return false;
    } else if(amount && !isValidAmount(amount)) {
        return false;
    }

    return true;

}

module.exports = {isValidTransaction, isValidForUpdate};