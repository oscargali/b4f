'use strict';
const createEAReqCtx = require('../context/eaRequestContext');
const onFinished = require('on-finished');

/**
 * Middleware expres que implementa la gestión del ciclo de vida de una petición.
 *
 * @param {Request} req - Petición de entrada
 * @param {Response} res - Respuesta
 * @param {function} next - Función para dar paso al siguiente middleware.
 */
function eaLifeCycleMiddleware(req, res, next) {
  initExecution(req, res);
  next();
  endExecution(req, res);
}

/**
 * Realiza las acciones cuando la petición llega
 *
 * @param {Request} req - Petición de entrada
 * @param {Response} res - Respuesta
 */
function initExecution(req, res) {
  console.log('eaInitRequest-Inicio');

  const eaReqCtx = createEAReqCtx(); //creamos el contexto de request
  eaReqCtx.startTime = Date.now(); //cogemos marca de tiempo inicial de la petición para el cálculo de trazas
  res.locals.eaReqCtx = eaReqCtx; //guardamos el contexto en el response para que pase por la cadena de interceptores y routers

  onFinished(res, recordTimeTraces); //registramos para grabar las trazas cuando acabe la petición

  console.log('eaInitRequest-Fin');
}

/**
 * Realiza las acciones cuando la petición sale
 *
 * @param {Request} req - Petición de entrada
 * @param {Response} res - Respuesta
 */
function endExecution(req, res) {
  console.log('eaFinRequest-Inicio');

  const eaAppCtx = req.app.locals.eaAppCtx;
  eaAppCtx.reqNum++;

  console.log('eaFinRequest-Fin');
}

/**
 * Calcula y graba las trazas de tiempo cuando la petición ha terminado
 *
 * @param {*} err - Error
 * @param {Response} res - Respuesta
 * @returns
 */
function recordTimeTraces(err, res) {
  console.log('recordTimeTraces-Inicio');

  if (err) return console.log('Error al grabar las trazas de tiempo');

  const eaReqCtx = res.locals.eaReqCtx;
  eaReqCtx.endTime = Date.now();
  const duration = eaReqCtx.endTime - eaReqCtx.startTime;

  if (duration < 0) duration = 0;

  console.log(
    `Tiempo total: ${duration}, Tiempo servicio: ${eaReqCtx.serviceElapsedTime}`
  );
  console.log('recordTimeTraces-Fin');
}

module.exports = eaLifeCycleMiddleware;
