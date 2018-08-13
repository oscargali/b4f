const Joi = require('joi');

let courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

function searchCourse(id) {
  return courses.find(course => course.id === Number(id));
}

function validateCourseId(id) {
  const schema = {
    id: Joi.string().required()
  };
  return Joi.validate(id, schema);
}

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports.courses = courses;
module.exports.validateCourse = validateCourse;
module.exports.searchCourse = searchCourse;
module.exports.validateCourseId = validateCourseId;
