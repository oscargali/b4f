'use strict';

const EAResult = require('./eaResult');

module.exports.path = '/healthcheck';
module.exports.method = 'GET';
module.exports.service = service;
module.exports.syntacticValidations = syntacticValidations;
module.exports.semanticValidations = semanticValidations;

function syntacticValidations(eaAppCtx, eaReqCtx, params, body) {
  const promise = new Promise((resolve, reject) => {
    resolve(new EAResult(false, null, 200, ''));
  });
  return promise;
}

function semanticValidations(eaAppCtx, eaReqCtx, params, body) {
  const promise = new Promise((resolve, reject) => {
    resolve(new EAResult(false, null, 200, ''));
    //resolve(new EAResult(true, null, 404, 'error provocado'));
  });
  return promise;
}

function service(eaAppCtx, eaReqCtx, params, body) {
  const promise = new Promise((resolve, reject) => {
    resolve(new EAResult(false, eaAppCtx, 200, ''));

    //reject(new Error('error provocado'));
  });
  return promise;
}
