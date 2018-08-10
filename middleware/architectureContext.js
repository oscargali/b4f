'use strict';

function createArchitectureContext() {
  return {
    startTime: 0,
    endTime: 0,
    middlewareTimes: []
  };
}

module.exports = createArchitectureContext;
