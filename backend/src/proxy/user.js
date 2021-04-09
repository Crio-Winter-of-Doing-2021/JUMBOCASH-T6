const User = require("../models/user");
const errorHandler = require("../services/handleErrors");
const userValidation = require('../services/validateUser');

var UserDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateUser: updateUser,
  findOrCreateUser: findOrCreateUser,
  findUserByToken: findUserByToken
};

async function findAll() {
  return await User.findAll();
}

async function findById(id) {
  try {
    return await User.findByPk(id);
  } catch (err) {
    errorHandler(err);
  }
}

async function deleteById(id) {
  return await User.destroy({ where: { id: id } });
}

async function create(user) {
  try {
    var newUser = new User(user);
    // test
    // console.log(newUser);
    return await newUser.save();
  } catch (err) {
    throw { code: 500, message: err };
  }
}

async function findOrCreateUser(userDetails) {
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        emailId: userDetails.emailId,
        name: userDetails.name
      }
    });

    if(created) {
        user.token = userDetails.token;
        await user.save();
        console.log("Registered and access token added");
    } else {
      // if registered
      // if token exists
        // if(user.token !== null) {
          user.token = userDetails.token;
          await user.save();
          console.log("Existing user login, refreshed access token")
        // } else {
        //   console.log("Existing user login, after logging out");
        //   return null;
        // }
    }
    // console.log(user, created);
    return user;

  } catch (err) {
    errorHandler();
  }
}

async function updateUser(user, id) {

  try {

    if(! userValidation.isValidUserForUpdate(user)) {
      return false;
    }

    let userFound = await User.findOne({where: {id}});

    userFound.companyName = user.companyName;
    userFound.contact = user.contact;

    return await userFound.save();

  } catch (err) {
    errorHandler(err);
  }
}

async function findUserByToken(token) {
  try {
    const user = await User.findOne({ where: { token } });
    return user;
  } catch (err) {
    errorHandler(err);
  }
}


module.exports = UserDao;
