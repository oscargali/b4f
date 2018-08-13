'use strict';

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const awsServerlessExpressMid = require('aws-serverless-express/middleware');
const eaLifeCycleMid = require('../middleware/eaLifeCycleMiddleware');
const eaErrorMid = require('../middleware/eaErrorMiddleware');
const createEAAppCtx = require('../context/eaApplicationContext');
const eaRouterLoader = require('../routes/eaRouteLoader');

const LAMBDA = 'lambda';
const SERVER = 'server';

/**
 * Crea una app express configurada para trabajar de acuerdo a la arquitectura y según el runtime.
 *
 * @param {String} runtime - Runtime sobre el que se ejecutará la aplicación.
 * @returns - Aplicación express configurada
 */
function createApp(runtime) {
  if (!runtime || (runtime != SERVER && runtime != LAMBDA))
    throw new Error('Application type incorrect');

  const app = express();

  initEAAppCtx(); //inicializamos el contexto de aplicación

  app.use(eaLifeCycleMid); //configuramos el middleware de ciclo de vida de arquitectura
  app.use(helmet()); //seguridad
  app.use(compression()); //compresion de datos
  app.use(express.json()); //json en body del mensaje

  //middelware sólo para lambda
  if (runtime == 'lambda') app.use(awsServerlessExpressMid.eventContext()); //permite recuperar event y context del AWS API GTW

  app.use('/API', eaRouterLoader); //configuramos las rutas de las api
  app.use(eaErrorMid); //gestion de errores

  function initEAAppCtx() {
    const eaAppCtx = createEAAppCtx();
    eaAppCtx.startUpTime = new Date().toString();
    app.locals.eaAppCtx = eaAppCtx;
  }

  return app;
}

module.exports = createApp;
