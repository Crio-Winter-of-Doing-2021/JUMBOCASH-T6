const User = require('../models/user');
var UserDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUser: updateUser
}

async function findAll() {
    return await User.findAll();
}

async function findById(id) {
    return await User.findByPk(id);
}

async function deleteById(id) {
    return await User.destroy({ where: { id: id } });
}

async function create(user) {

    try {
        var newUser = new User(user);
        // test
        console.log(newUser);
        return await newUser.save();

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

module.exports = UserDao;