const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  const userId = jwt.verify(token, 'secretKey');
  User.findByPk(userId).then((user) => {
    req.user = user;
    next();
  });
};
