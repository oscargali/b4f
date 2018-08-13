'use strict';

module.exports = class EAResult {
  constructor(error, result, statusHttp, message) {
    this.error = error;
    this.result = result;
    this.httpCode = statusHttp;
    this.message = message;
  }
};
