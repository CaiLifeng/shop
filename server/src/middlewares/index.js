/**
 * Created by caili on 2016/8/1.
 */
function authError(err, req, res, next) {
    if (err) return res.sendStatus(401);
    next();
}

//setHeader
function setHeader(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,access_token,access-token,content-type,multipart/form-data,application/x-www-form-urlencoded,Authorization;');
    next();
}

module.exports = {
    authError: authError,
    setHeader: setHeader
};