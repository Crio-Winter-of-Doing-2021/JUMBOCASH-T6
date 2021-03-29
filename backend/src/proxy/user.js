const User = require('../models/user');
const errorHandler = require('../services/handleErrors');

var UserDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUser: updateUser,
    findOrCreateUser: findOrCreateUser,
    findUserByToken: findUserByToken,
    validateToken: validateToken
}

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

    } catch(err) {
        throw {code: 500, message: err}
    };

}

async function findOrCreateUser(userDetails) {

    try {
        const [user, created] = await User.findOrCreate({
            where: { emailId: userDetails.emailId, name: userDetails.name, token: userDetails.token }
        });

        return [user, created];

    } catch(err) {
        throw {code: 500, message: err}
    };
}

async function updateUser(user, id) {
    var updateUser = {
        name: user.name,
        emaiId: user.emaiId,
        companyName: user.companyName,
        email: user.email
    };
    return await User.update(updateUser, { where: { id: id } });
}

async function findUserByToken(token) {
    try {
        const user = await User.findOne({ where: {token}})
        return user;
    } catch(err) {
        errorHandler(err);
    }
}

async function validateToken(token) {
    try {
        const user = await User.findOne({attributes: ['id'], where: {token}})
        return user;
    } catch(err) {
        errorHandler(err);
    }
}

module.exports = UserDao;