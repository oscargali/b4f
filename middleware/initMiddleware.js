'use strict';

const createArchitectureContextCreator = require('./architectureContext');

function initMiddleware(req, res, next) {
  //creamos el contexto de arquitectura
  const architectureContext = createArchitectureContextCreator();

  //cogemos marca de tiempo inicial de la petición
  architectureContext.startTime = Date.now();

  //guardamos el contexto en el response para que pase por la cadena de interceptores
  res.locals.architectureContext = architectureContext;

  console.log('initMiddleware');

  next();

  // The 'finish' event will emit once the response is done sending
  // res.once('finish', () => {
  //   const tiempoFin = Date.now();
  //   let duracion = tiempoFin-tiempoInicio;

  //   if (duracion < 0)
  //     duracion=0;

  //   console.log(`API ${req.route} - ${duracion}`);
  // });
}

module.exports = initMiddleware;
