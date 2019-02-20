const express = require('express');

let helloworldFunction = (req, res) => res.send('HELLO WORLD!')

module.exports = {
  helloworld: helloworldFunction
}