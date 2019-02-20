const express = require('express');
const blogController = require('./../controllers/blogController');

let setRouter = (app) =>{
  
  app.get('/helloworld', blogController.helloworld);

}
// end setRouter function

module.exports = {
  setRouter: setRouter
}