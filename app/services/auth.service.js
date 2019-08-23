var auth = require('basic-auth')
var authInfo = require('../../config').auth;
var service = {};

service.checkAuth = checkAuth;
service.responseError = responseError;

module.exports = service;

function checkAuth(req) {
	var credentials = auth(req)		 
	if (!credentials || credentials.name !== authInfo.user || credentials.pass !== authInfo.password) {
		return false;
	} else {
		return true;
	}
}

function responseError(res) {
	res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied');
    return res;
}