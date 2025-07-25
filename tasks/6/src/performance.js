globalThis.PERF_MARK = function perfMark(metricName, additionalInfo) {
  console.log('call metric');
  performance.mark(metricName, additionalInfo);
};
