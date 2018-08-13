'use strict';

function createEARequestContext() {
  const eaReqCtx = {
    startTime: 0,
    endTime: 0,
    serviceElapsedTime: 0,
    middlewareTimes: []
  };
  Object.seal(eaReqCtx);
  return eaReqCtx;
}

module.exports = createEARequestContext;
