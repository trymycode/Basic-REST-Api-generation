const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib');
const timelib = require('./../libs/timeLib');
// Importing the model here
const BlogModel = mongoose.model('Blog');

let getAllBlog = (req, res) =>{

  BlogModel.find()
            .select('-_v -_id')
            .lean()
            .exec((err, result)=>{
              if(err){
                console.log(err);
                let apiResponse = response.generate(true, 'Failed To Find Blog Details', 500, null)
                res.send(apiResponse);
              } else if(result == undefined || result == null || result == '' ){
                let apiResponse = response.generate(true, 'No blog Found', 404, null)
                res.send(apiResponse);
              } else {
                let apiResponse = response.generate(false, 'All Blog Details Found', 200, result);
                res.send(apiResponse);
              }
            })
            
}
// end get all blogs

let viewByBlogId = (req, res) =>{
  console.log(req.user);
  BlogModel.findOne({'blogId': req.params.blogId},(err, result)=>{
    if(err){
      console.log('Error Occured.');
      let apiResponse = response.generate(true,'Error occured', 500, null);
      res.send(apiResponse);
    }else if( result == undefined || result == null || result == ''){
      console.log('No Blog found');
      let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
      res.send(apiResponse)
    }else {
      let apiResponse = response.generate(false, 'Blog Found Successfully.', 200, result)
      res.send(apiResponse)
    }
  })
}
// end viewByBlogId

let createBlog = (req, res)=>{
  
  let blogId = shortid.generate();
  let newBlog = new BlogModel({
    blogId: blogId,
    title: req.body.title,
    description: req.body.description,
    bodyHtml: req.body.bodyHtml,
    category: req.body.category,
    author: req.body.author,
    created: timelib.getLocalTime(),
    lastModified: timelib.getLocalTime()
    
  }
  )
  

  let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : [];

  newBlog.tags = tags;
  newBlog.save((err, result)=>{
    if(err){
      console.log('Error Occured.');
      let apiResponse = response.generate(true, 'Error Occured.', 500, null)
      res.send(apiResponse);
    }else {
      console.log('Success in blog creation');
      let apiResponse = response.generate(false, 'Blog created successfully.', 200, result);
      res.send(apiResponse);
    }
  })
  

}
let editBlog = (req, res) =>{
  let options = req.body;
  BlogModel.update({'blogId': req.params.blogId}, options, { multi: true}).exec((err, result)=>{
    if(err){
      console.log('Error Occured.');
      let apiResponse = response.generate(true, 'Error Occured.', 500, null)
      res.send(apiResponse)
    }else if (result == undefined || result == null || result == ''){
      console.log('Blog Not Found.')
      let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
      res.send(apiResponse);
    } else {
      console.log('Blog Edited Successfully')
      let apiResponse = response.generate(false, 'Blog Edited Successfully.', 200, result)
      res.send(apiResponse);
    }
  })
}

let deleteBlog = (req, res) =>{
  BlogModel.remove({ 'blogId': req.params.blogId }, (err, result)=>{
    if(err){
      console.log('Error Occured.')
      let apiResponse = response.generate(true, 'Error Occured.', 500, null)
       res.send(apiResponse);
    } else if (result == undefined || result == null || result == ''){
      console.log('Blog Not Found.')
      let apiResponse = response.generate(true, 'Blog Not Found.', 404, null)
      res.send(apiResponse);
    } else {
      console.log('Blog Deletion Success')
      let apiResponse = response.generate(false, 'Blog Deleted Successfully', 200, result)
      res.send(apiResponse);
    }
  })
}
module.exports = {
  getAllBlog: getAllBlog,
  viewByBlogId: viewByBlogId,
  createBlog: createBlog,
  editBlog: editBlog,
  deleteBlog: deleteBlog
}