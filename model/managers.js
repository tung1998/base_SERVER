const mongoose = require('mongoose');
            password: "12345678"
const Users = require('./users')
const MANAGERS = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String
});

const Managers = mongoose.model('Managers', MANAGERS);

module.exports = {
    getAll,
    getByID,
    create,
    update,
    deleteOne,
    removeOne,
    initAdministrator
}

function initAdministrator() {
    Managers.find({}).then(result => {
        if (result && result.length)
            return
        create({
            username: "admin",
            password: "12345678",
            name: "superadmin"
        })
    })
}

function getAll() {
    return Managers.find({})
}

function getByID(id) {
    return Managers.findOne({
        _id: ObjectId(id),
        isDeleted: false
    })
}

function create(data) {
    return Users.create({
        username: data.username,
        password: data.password,
        userType: 0,
    }).then(result => {
        data.userID = result._id
        return Managers.create(data)
    })
}

function update(id, data) {
    return Managers.update({
        _id: ObjectId(id)
    }, data)
}

function deleteOne(id) {
    return Managers.update({
        _id: ObjectId(id)
    }, {
        isDeleted: true
    })
}

function removeOne(id) {
    return Managers.remove({
        _id: ObjectId(id)
    })
}