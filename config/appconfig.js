let appconfig =  {};
appconfig.port = 3000;
appconfig.allowedCorsOrigin = "*";
appconfig.env = "dev";
appconfig.db = {
  uri: 'mongodb://test:test@127.0.0.1:27017/blogAppDB'
}
appconfig.apiVersion = '/api/v1';

module.exports = {
  port: appconfig.port,
  allowedCorsOrigin: appconfig.allowedCorsOrigin,
  environment: appconfig.env,
  db: appconfig.db,
  apiVersion: appconfig.apiVersion
}
// end module exports