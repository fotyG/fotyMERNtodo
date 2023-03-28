const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (request, response, next) => {
  try {
    // get token from the authorization header, split from bearer
    const token = await request.headers.authorization.split(" ")[1];
    // check if token matches origin
    const decodedToken = await jwt.verify(
      token,
      process.env.TOKEN_SECRET
    )
    // retrieve user details of logged in user
    const user = await decodedToken;
    // pass user to endpoints
    request.user = user;
    // next middleware
    next();
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request")
    })
  }
}