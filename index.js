const express = require('express');

const app = express();

const appConfig = require('./config/appconfig');

app.get('/', (req, res) => res.send("Hello world") );
app.listen(appConfig.port, ()=>{
  console.log("App is listening on port 3000!");
})