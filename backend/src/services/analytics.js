const enums = require("../../config/data");
const { parseAsync } = require('json2csv');
const fs = require('fs');
const errorHandler = require("./handleErrors");


function analyseTotalOutflowInflow(CashflowList, limit = 10) {
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

  pendingInflowComponents = pendingInflowComponents.slice(0, limit);
  pendingOutflowComponents = pendingOutflowComponents.slice(0, limit);
  currentInflowComponents = currentInflowComponents.slice(0, limit);
  currentOutflowComponents = currentOutflowComponents.slice(0, limit);


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

async function getReport(userId, cashflow, entityAnalytics, trend) {

  try {

    // Create a directory in async
    // await fs.access(`report/${userId}`, function(err) {

    //   if (err && err.code === 'ENOENT') {

    //     fs.mkdir(`report/${userId}`, function(err) {
    //       if(err) {
    //         errorHandler(err);
    //       }
    //       console.log("created");
    //     }); //Create dir in case not found
    //   }
    // });

    
    if (!fs.existsSync(`report/${userId}`)){
      fs.mkdirSync(`report/${userId}`);
    }

    await Promise.all([
      writeCsvHelper(`report/${userId}/current-inflow.csv`, cashflow.current.inflow.components),
      writeCsvHelper(`report/${userId}/current-outflow.csv`, cashflow.current.outflow.components),
      writeCsvHelper(`report/${userId}/pending-inflow.csv`, cashflow.pending.inflow.components),
      writeCsvHelper(`report/${userId}/pending-outflow.csv`, cashflow.pending.outflow.components),
    
      writeCsvHelper(`report/${userId}/entity-current-inflow.csv`, pretifyEntity(entityAnalytics.current.inflow.components) ),
      writeCsvHelper(`report/${userId}/entity-current-outflow.csv`, pretifyEntity(entityAnalytics.current.outflow.components) ),
      writeCsvHelper(`report/${userId}/entity-pending-inflow.csv`, pretifyEntity(entityAnalytics.pending.inflow.components) ),
      writeCsvHelper(`report/${userId}/entity-pending-outflow.csv`, pretifyEntity(entityAnalytics.pending.outflow.components) )

    ]);

    return true;

  } catch (err) {
    errorHandler(err);
  }

}

function pretifyEntity(entityList) {

  prettyEntityList = entityList.map(entity => {

    delete entity["entityId"];
    delete entity["paymentStatus"];
    delete entity["category"];
    entity["name"] = entity["entity"]["name"];
    entity["contact"] = entity["entity"]["contact"];
    delete entity["entity"];

    return entity;
  });

  return prettyEntityList;

}

async function writeCsvHelper(filePath, data, opts = {}) {

  try {

  const csv = await parseAsync(data, opts);

  return new Promise(function(resolve, reject) {
    fs.writeFile(filePath, csv, { encoding: "utf-8" }, function(err) {
        if (err) reject(err);
        else resolve(true);
    });
  });

  } catch (err) {
    errorHandler(err);
  }

}

module.exports = {
  analyseTotalOutflowInflow: analyseTotalOutflowInflow,
  getReport: getReport
};
