function endMiddleware(req, res, next) {
  //recuperamos el contexto de arquitectura
  const archtitectureContext = res.locals.architectureContext;
  archtitectureContext.endTime = Date.now();

  const duration =
    archtitectureContext.endTime - archtitectureContext.startTime;

  if (duration < 0) duration = 0;

  console.log(
    `API ${req.protocol} ${req.path} ${req.params} ${req.query} - ${duration}`
  );

  console.log(req.mehtod);
  console.log(req.path);
  console.log(req.query);

  res.end();

  console.log('endMiddleware');
}

module.exports = endMiddleware;
