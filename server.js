'use strict';

const createApp = require('./application/application');

//crea una aplicación express configurada para runtime servidor
const app = createApp('server');

const port = 4000;

app.listen(port);
console.log(`listening on http://localhost:${port}`);
