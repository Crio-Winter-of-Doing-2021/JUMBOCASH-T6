const deleteToken = require("../proxy/authentication").deleteToken;

const logoutUser = async (req, res) => {

    try {
      console.log(req.user);
      if (req.user) {
        // perform deletion of access token from db
        await deleteToken(req.user);
        req.logout();
        console.log("token deleted");
        return res.json({ msg: "logging you out" });
      } else {
        return res.json({ msg: "no user to log out!" });
      }
    } catch(err) {
      res.status(err.code).send({
        error: true,
        errorMessage: err.message,
      });
    }
    
  }

module.exports = {
    logoutUser: logoutUser
}