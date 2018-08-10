'use strict';

function errorMiddleware(err, req, res, next) {
  res.status(500).send(`Somethig failed: ${err.message}`);

  console.log('errorMiddleware');
  next();
}

module.exports = errorMiddleware;
