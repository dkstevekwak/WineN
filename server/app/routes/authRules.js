var ensureLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()  && (['user', 'admin'].indexOf(req.user.role) > -1 )) { //req.user
    next();
  } else {
    res.status(401).end();
  }
};
var ensureSelfOrAdmin = function (req, res, next) {
  if (req.isAuthenticated()  && req.user.role === 'admin') { //req.user
    next();
  } else {
    res.status(401).end();
  }
};
var ensureAdmin = function (req, res, next) {
  if (req.isAuthenticated()  && req.user.role === 'admin') { //req.user
    next();
  } else {
    res.status(401).end();
  }
};

module.exports = {
  ensureLoggedIn,
  ensureAdmin
}