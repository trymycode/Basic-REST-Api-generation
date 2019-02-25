// const libraries
const response = require('./../libs/responseLib');

let isAuthenticated = (req, res, next) => {
  if(req.params.authToken ||req.query.authToken || req.header('authToken')){
    if(req.params.authToken == 'Admin'||req.query.authToken == 'Admin' || req.header('authToken')== 'Admin'){
      req.user = {
        fullName: 'Admin',
        userId: 'Admin'
      }
      next();
    }
    else {
  let apiResponse = response.generate(true, 'Incorrect Authentication', 403, null);
  res.send(apiResponse);  
    } 
  } else {
    let apiResponse = response.generate(true, 'Authentication Token Is Missing In Request', 403, null)
    res.send(apiResponse)
  }

}
module.exports = {
  isAuthenticated: isAuthenticated
}