'use strict';
const EAResult = require('../../routes/eaResult');
const { courses, validateCourse } = require('./utils/courseUtils');

module.exports.path = '/courses';
module.exports.method = 'POST';
module.exports.service = service;
module.exports.syntacticValidations;
module.exports.syntacticValidations = syntacticValidations;
module.exports.semanticValidations = semanticValidations;

function syntacticValidations(eaAppCtx, eaReqCtx, params, body) {
  const promise = new Promise((resolve, reject) => {
    const { error } = validateCourse(body);

    if (error)
      resolve(
        new EAResult(
          true,
          null,
          400,
          error.details.reduce((valor, detalle, indice, array) => {
            return `${valor}, ${detalle.message}`;
          }, '')
        )
      );
    else resolve(new EAResult(false, null, 200, ''));
    //resolve(new EAResult(true, null, 404, 'error provocado'));
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
    const course = {
      id: courses.length + 1,
      name: body.name
    };

    //Añadimos al array de forma inmutable
    //courses = [...courses, course];
    courses.push(course);
    resolve(new EAResult(false, course, 200, ``));
    //reject(new Error('error provocado'));
  });
  return promise;
}
