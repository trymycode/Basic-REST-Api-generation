const express = require('express');
const appConfig = require('./config/appconfig');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
// Bootstrap route
let routesPath = './routes';
fs.readdirSync(routesPath).forEach(function(file){
  if(~file.indexOf('.js')){
    let route = require(routesPath + '/' + file);
    console.log("including the following file");
    console.log(routesPath + '/' + file);
    route.setRouter(app);
  }
})

//listening the server - creating a local server
app.listen(appConfig.port, () => {
  console.log('Example app listening on port 3000!');
  //creating the mongo db connection here
  let db = mongoose.connect(appConfig.db.uri, {  useNewUrlParser: true });

})