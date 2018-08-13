'use strict';
const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const servicesFolderPath = path.resolve(process.cwd(), './services'); //directorio base de la aplicación
let services = findServices(servicesFolderPath); //buscamos recursivamente todos los servicios de aplicación
services = [...services, ...findServices(__dirname)]; //añadimos el servicio de healthcheck

console.log(services);

services.forEach((service, index) => registerService(service, index, router));

global.services = services; //almacenamos los objetos en el contexto global

/**
 * Busca todos los archivos acabados en Service.js, los importa y los almacena en un array
 *
 * @param {string} basePath - Path donde empezar a buscar
 * @returns {Array} - Array de servicios
 */
function findServices(basePath) {
  let services = [];

  const files = fs.readdirSync(basePath); //leemos los archivos y directorios

  for (let file of files) {
    const pathFile = path.resolve(basePath, file);
    const isDirectory = fs.lstatSync(pathFile).isDirectory(); //obtenemos si se trata de un directorio

    if (isDirectory && file !== 'utils')
      services = [...services, ...findServices(pathFile)];
    //llamamos recursivamente
    else if (isDirectory && file === 'utils') continue;
    else if (/Service.js$/.test(file)) {
      console.log(file);
      console.log(pathFile);
      services = [...services, require(pathFile)]; //añadimos el servicio
    } else {
      console.log(
        `Archivo: ${file} en ${basePath} no es un archivo de Servicio`
      );
    }
  }
  return services;
}

/**
 * Añade al router el servicio y genera su wrapper.
 *
 * @param {Object} service
 * @param {number} index
 * @param {Router} router
 */
function registerService(service, index, router) {
  const funcBody = `
    const eaReqCtx = res.locals.eaReqCtx;
    const eaAppCtx = req.app.locals.eaAppCtx;
    const params = req.params;
    const body = req.body;
    const service = services[${index}];
    const startTime = Date.now();

    console.log('applicationService-Inicio');

    service.syntacticValidations(eaAppCtx, eaReqCtx, params, body)
    .then(eaResult=>{
      if (eaResult.error) return eaResult;
      else return service.semanticValidations(eaAppCtx, eaReqCtx, params, body);})
    .then(eaResult=>{
      if (eaResult.error) return eaResult;
      else return service.service(eaAppCtx, eaReqCtx, params, body);})
    .then(eaResult=>{
      if (eaResult.error) 
        res.status(eaResult.httpCode).send(eaResult.message);
      else {
        eaReqCtx.serviceElapsedTime = Date.now() - startTime;
        console.log('applicationService-Fin');
        res.status(200).json(eaResult.result);}})
    .catch(err=> next(err));

    console.log('applicationService-Fin');`;

  const wrapper = new Function('req', 'res', 'next', funcBody);

  router[service.method.toLowerCase()](service.path, wrapper);
}

module.exports = router;
