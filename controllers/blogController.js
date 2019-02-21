const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
// Importing the model here
const BlogModel = mongoose.model('Blog');

let getAllBlog = (req, res) =>{
  BlogModel.find()
            .select('-_v -_id')
            .lean()
            .exec((err, result)=>{
              if(err){
                console.log(err)
                res.send(err)
              } else if(result == undefined || result == null || result == '' ){
                console.log('No Blog Found');
                res.send('No Blog Found');
              } else {
                res.send(result);
              }
            })
            
}
// end get all blogs

let viewByBlogId = (req, res) =>{
  BlogModel.findOne({'blogId': req.params.blogId},(err, result)=>{
    if(err){
      console.log(err);
      res.send(err);
    }else if( result == undefined || result == null || result == ''){
      console.log('No Blog found');
      res.send('No Blog Found');
    }else {
      res.send(result);
    }
  })
}
// end viewByBlogId

let createBlog = (req, res)=>{
  var today = Date.now();
  let blogId = shortid.generate();

  let newBlog = new BlogModel({
    blogId: blogId,
    title: req.body.title,
    description: req.body.description,
    bodyHtml: req.body.bodyHtml,
    category: req.body.category,
    author: req.body.author,
    created: today
  })

  let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : [];

  newBlog.tags = tags;
  newBlog.save((err, result)=>{
    if(err){
      console.log(err);
      res.send(err)
    }else {
      res.send(result)
    }
  })

}
let editBlog = (req, res) =>{
  let options = req.body;
  BlogModel.update({'blogId': req.params.blogId}, options, { multi: true}).exec((err, result)=>{
    if(err){
      console.log(err);
      res.send(err);
    }else if (result == undefined || result == null || result == ''){
      console.log('No Blog Found')
      res.send("No Blog Found")
    } else {
      res.send(result);
      console.log('Blog updated successfully');
    }
  })
}

let deleteBlog = (req, res) =>{
  BlogModel.remove({ 'blogId': req.params.blogId }, (err, result)=>{
    if(err){
      console.log(err);
      res.send(err);
    } else if (result == undefined || result == null || result == ''){
      console.log('No Blog Found')
      res.send("No Blog Found")
    } else {
      res.send(result);
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