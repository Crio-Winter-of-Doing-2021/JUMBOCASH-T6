const userProxy = require('../proxy/user');

const getUserById = async (req, res) => {

    // console.log("In user controller", req.userId);
    const id = req.userId;
  
    userProxy
      .findById(id)
      .then((value) => {
  
        if(value === null) {
            throw {code: 404, message: "User does not exist"}
        }
  
        res.status(200).send({
          error: false,
          data: value,
        });
      })
      .catch((err) => {
        res.status(err.code).send({
          error: true,
          errorMessage: err.message,
        });
      });
  };

  module.exports = {
      getUserById: getUserById
  }