import { object } from 'yup';

export const formatTrendChartsData = (data, interval) => {
  const mapDateToAmount = (items) =>
    items.reduce((acc, item) => {
      const formattedDate = new Date(item.startTime).toISOString();
      acc[formattedDate] = acc[formattedDate]
        ? acc[formattedDate] + Number(item.totalAmount)
        : Number(item.totalAmount);
      return acc;
    }, {});

  const { inflow, outflow } = data.current;
  const inflowObj = mapDateToAmount(inflow.components);
  const outflowObj = mapDateToAmount(outflow.components);

  const pendingInflowObj = mapDateToAmount(data.pending.inflow.components);
  const pendingOutflowObj = mapDateToAmount(data.pending.outflow.components);
  const labels = Array.from(
    new Set([
      ...Object.keys(inflowObj),
      ...Object.keys(outflowObj),
      ...Object.keys(pendingInflowObj),
      ...Object.keys(pendingOutflowObj),
    ]),
  ).sort();

  const inflowValues = labels.map((item) => inflowObj[item] || 0);
  const outflowValues = labels.map((item) => outflowObj[item] || 0);
  const pendingInflowValues = labels.map((item) => pendingInflowObj[item] || 0);
  const pendingOutflowValues = labels.map((item) => pendingOutflowObj[item] || 0);
  return { labels, inflowValues, outflowValues, pendingInflowValues, pendingOutflowValues };
};

export const formatTopEntitiesChartsData = (data, interval) => {
  const mapEnityIdToAmount = (items) =>
    items.reduce((acc, item) => {
      acc[item.entityId] = acc[item.entityId]
        ? acc[item.entityId] + Number(item.totalAmount)
        : Number(item.totalAmount);
      return acc;
    }, {});

  const getInflowOutflowValues = (obj) => {
    const { inflow, outflow } = obj;
    const inflowObj = mapEnityIdToAmount(inflow.components);
    const outflowObj = mapEnityIdToAmount(outflow.components);
    return {
      inflowLabels: Object.keys(inflowObj),
      inflowValues: Object.values(inflowObj),
      outflowLabels: Object.keys(outflowObj),
      outflowValues: Object.values(outflowObj),
    };
  };
  const { inflowLabels, inflowValues, outflowLabels, outflowValues } = getInflowOutflowValues(
    data.pending,
  );
  return {
    ...getInflowOutflowValues(data.current),
    pendingInflowLabels: inflowLabels,
    pendingInflowValues: inflowValues,
    pendingOutflowLabels: outflowLabels,
    pendingOutflowValues: outflowValues,
  };
};

export const formatCashflowSummaryData = (data) => { 
    const inflow = data.current.inflow.totalAmount;
    const outflow = data.current.outflow.totalAmount;
    const pendingInflow = data.pending.inflow.totalAmount;
    const pendingOutflow = data.pending.outflow.totalAmount;
    const totalInflow = inflow + pendingInflow;
    const totalOutflow = outflow + pendingOutflow;
    const totalTransactions = totalInflow + totalOutflow;
    return {totalInflow,totalOutflow,pendingInflow,pendingOutflow,totalTransactions}
}