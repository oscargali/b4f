'use strict';
const EAResult = require('../../routes/eaResult');
const {
  courses,
  searchCourse,
  validateCourse,
  validateCourseId
} = require('./utils/courseUtils');

module.exports.path = '/courses/:id';
module.exports.method = 'DELETE';
module.exports.service = service;
module.exports.syntacticValidations = syntacticValidations;
module.exports.semanticValidations = semanticValidations;

function syntacticValidations(eaAppCtx, eaReqCtx, params, body) {
  const promise = new Promise((resolve, reject) => {
    const { error } = validateCourseId(params);

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
    const course = searchCourse(params.id);

    if (!course)
      resolve(
        new EAResult(true, null, 404, `No course found with id ${params.id}`)
      );

    const index = courses.indexOf(course);

    //eliminamos el curso de forma inmutable
    //courses = [...courses.slice(0, index), ...courses.slice(index + 1)];
    courses.splice(index, 1);

    resolve(new EAResult(false, course, 200, ``));
  });
  return promise;
}
