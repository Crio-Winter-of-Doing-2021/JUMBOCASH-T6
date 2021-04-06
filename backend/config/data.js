const categoryList = ["SALES", "PURCHASE", "EMPLOYEE", "TAX", "ASSET_LIQUIDATION"];
const paymentModeList = ["CASH", "DEBIT_CARD","CREDIT_CARD", "UPI"];
const paymentStatusList = ["PAID", "NOT_PAID"];
const inflowCategoryList = ["SALES", "ASSET_LIQUIDATION"];
const outflowCategoryList = ["PURCHASE", "EMPLOYEE", "TAX"];
const trendIntervals = ["week", "month", "quarter", "year"];

const enums = {
    categoryList: categoryList,
    paymentModeList: paymentModeList,
    paymentStatusList: paymentStatusList,
    inflowCategoryList: inflowCategoryList,
    outflowCategoryList: outflowCategoryList,
    trendIntervals: trendIntervals
}

module.exports = enums;