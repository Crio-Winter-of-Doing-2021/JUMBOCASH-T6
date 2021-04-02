const User = require("../models/index").User;
const errorHandler = require("../services/handleErrors");

async function validateToken(token) {
    try {
      const user = await User.findOne({ attributes: ["id"], where: { token } });
      return user;
    } catch (err) {
      errorHandler(err);
    }
  }
  
  async function updateToken(userId, newToken) {
      try {
          const user = await User.findOne({ where: { id: userId } });
          if(user === null) {
              throw {code: 404, message: "No user to logout"}
          }
          // delete access token
          user.token = newToken; 
          return await user.save();
      } catch (err) {
          errorHandler(err);
      }
  }
  
  async function deleteToken(userId) {
      try {
          return await updateToken(userId, null);
      } catch (err) {
          errorHandler(err);
      }
  }

module.exports = {
  validateToken: validateToken,
  updateToken: updateToken,
  deleteToken: deleteToken
}