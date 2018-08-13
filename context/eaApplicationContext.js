'use strict';

/**
 * Crea el objeto EAAplicationContext y lo blinda para que no se pueda modificar
 *
 * @returns
 */
function createEAAplicationContext() {
  const eaAppCtx = {
    reqNum: 0,
    startUpTime: 0
  };
  Object.seal(eaAppCtx);
  return eaAppCtx;
}
module.exports = createEAAplicationContext;
