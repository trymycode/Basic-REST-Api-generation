let exampleMiddleware = (req, res, next) => {
  req.user = [{'userId':'user1','firstName': 'Aditya', 'lastName': 'Kumar','email': 'email1@gmail.com'},
  {'userId':'user2','firstName': 'Aditi', 'lastName': 'Kumari','email': 'email2@gmail.com'}]
  next();
}
// end 
module.exports = {
  exampleMiddleware: exampleMiddleware
} 