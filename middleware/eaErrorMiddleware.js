'use strict';

/**
 * Middleware encargado de la gestión de errores
 *
 * @param {Error} err - Excepción
 * @param {Request} req - Petición
 * @param {Response} res - Respuesta
 * @param {Function} next - Función que llama al siguiente middleware
 */
function eaErrorMiddleware(err, req, res, next) {
  console.log('eaErrorMiddleware-Ini');
  res.status(500).send(`Somethig failed: ${err.message}`);
  console.log(err);
  console.log('eaErrorMiddleware-Fin');
}

module.exports = eaErrorMiddleware;
