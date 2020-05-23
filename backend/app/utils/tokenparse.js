const JWT = require('jsonwebtoken');
module.exports = function tokenParse(token, secret) {
  const decode = JWT.verify(token, secret);

  //console.log(decode.userId)
  return decode.userId;
};