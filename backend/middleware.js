const jwt = require("jsonwebtoken");
const tokenSecret = "SecreT";

exports.verify = token => {
  if (!token) return 403;
  else {
    jwt.verify(token, tokenSecret, (err, value) => {
      console.log(value, "Value");
      return value.email;
    });
  }
};
