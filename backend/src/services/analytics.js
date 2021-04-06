const enums = require("../../config/data");

function analyseTotalOutflowInflow(CashflowList) {
  // pending inflow, pending outflow, current inflow, current outflow

  let pendingInflow = 0,
    pendingOutflow = 0,
    currentInflow = 0,
    currentOutflow = 0;
  let countPendingInflow = 0,
    countPendingOutflow = 0,
    countCurrentInflow = 0,
    countCurrentOutflow = 0;
  let pendingInflowComponents = [],
    pendingOutflowComponents = [],
    currentInflowComponents = [],
    currentOutflowComponents = []

  for (let cashflow of CashflowList) {
    cashflow = JSON.parse(JSON.stringify(cashflow)); // hack to sanitize postgres data
    let {
      paymentStatus,
      category,
      countTransactions,
      totalAmount,
    } = cashflow;

    if (paymentStatus === "NOT_PAID") {
      if (enums.inflowCategoryList.includes(category)) {

        pendingInflow += Number(totalAmount);
        countPendingInflow += Number(countTransactions);
        pendingInflowComponents.push(cashflow);

      } else if (enums.outflowCategoryList.includes(category)) {

        pendingOutflow += Number(totalAmount);
        countPendingOutflow += Number(countTransactions);
        pendingOutflowComponents.push(cashflow);

      }
    } else if (paymentStatus === "PAID") {
      if (enums.inflowCategoryList.includes(category)) {

        currentInflow += Number(totalAmount);
        countCurrentInflow += Number(countTransactions);
        currentInflowComponents.push(cashflow);

      } else if (enums.outflowCategoryList.includes(category)) {

        currentOutflow += Number(totalAmount);
        countCurrentOutflow += Number(countTransactions);
        currentOutflowComponents.push(cashflow);

      }
    }
  }

  return {

    pending: {
      inflow: {
        countTransaction: countPendingInflow,
        totalAmount: pendingInflow,
        components: pendingInflowComponents
      },
      outflow: {
        countTransaction: countPendingOutflow,
        totalAmount: pendingOutflow,
        components: pendingOutflowComponents
      }
    },
    current: {
      inflow: {
        countTransaction: countCurrentInflow,
        totalAmount: currentInflow,
        components: currentInflowComponents
      },
      outflow: {
        countTransaction: countCurrentOutflow,
        totalAmount: currentOutflow,
        components: currentOutflowComponents
      }
    }
  };
}

module.exports = {
  analyseTotalOutflowInflow: analyseTotalOutflowInflow,
};
