'use strict';

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const initMiddleware = require('../middleware/initMiddleware');
const endMiddleware = require('../middleware/endMiddleware');
const errorMiddleware = require('../middleware/errorMiddleware');

const LAMBDA = 'lambda';
const SERVER = 'server';

function createApp(runtime) {
  if (!runtime || (runtime != SERVER && runtime != LAMBDA))
    throw new Error('Application type incorrect');

  //creamos la apliciación express
  const app = express();

  //configuramos el middleware de inicio de ciclo de vida de arquitectura
  app.use(initMiddleware);

  //configuramos los middlwares comunes y generales
  app.use(helmet()); //seguridad
  app.use(compression()); //compresion de datos
  app.use(express.json()); //json en body del mensaje

  //middelware sólo para lambda
  if (runtime == 'lambda')
    app.use(awsServerlessExpressMiddleware.eventContext()); //permite recuperar event y context del AWS API GTW

  //configuramos las rutas de las api

  //gestion de errores
  app.use(errorMiddleware);

  //configuramos el middleware de fin de ciclo de vida de arquitectura
  app.use(endMiddleware);

  return app;
}

module.exports = createApp;
