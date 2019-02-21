const express = require('express');
const blogController = require('./../controllers/blogController');
const appConfig = require('./../config/appconfig');

let setRouter = (app) =>{
  
  let baseUrl = appConfig.apiVersion + '/blogs';
  app.get(baseUrl+ '/all', blogController.getAllBlog);
  app.get(baseUrl+'/view/:blogId',blogController.viewByBlogId);

  app.post(baseUrl+ '/create', blogController.createBlog);

  app.put(baseUrl+'/:blogId/edit' ,blogController.editBlog );

  app.post(baseUrl + '/:blogId/delete' , blogController.deleteBlog);
}
// end setRouter function

module.exports = {
  setRouter: setRouter
}