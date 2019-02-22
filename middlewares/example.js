let exampleMiddleware = (req, res, next) => {
  req.user = [{'message1': 'demo1 middleware'},
  {'message2': 'demo2 middleware'}]
  next();
}
// end 
module.exports = {
  exampleMiddleware: exampleMiddleware
} 