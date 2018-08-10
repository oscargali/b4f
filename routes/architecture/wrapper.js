'use strict';

function wrapper(handler) {
  return (req, res, next) => {

    try{
      await handler (req, res);
    }
    catch (error){
      next(error);
    }
  }

};