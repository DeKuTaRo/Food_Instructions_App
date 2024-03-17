const { ValidateSignature } = require("../utils");

module.exports = async (req, res, next) => {
  const isAuthorized = await ValidateSignature(req);
  if (isAuthorized) {
    return next();
  }
  return res.json({ message: "Not Authorized", statusCode: 403 });
};
