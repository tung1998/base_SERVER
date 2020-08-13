const mongoose = require('mongoose');
const Users = require('./users')
const EMPLOYEES = new mongoose.Schema({
    userID: Object,
    createdAt: {
        type: Number,
        default: Date.now()
    },
    updatedAt: {
        type: Number,
        default: Date.now()
    }
});

const Employees = mongoose.model('Employees', EMPLOYEES);

module.exports = {
    getAll,
    getByID,
    create,
    update,
    deleteOne,
    removeOne,
}

function getAll() {
    return Employees.find({})
}

function getByID(id) {
    return Employees.findOne({
        _id: ObjectId(id),
        isDeleted: false
    })
}

function create(data) {
    return Users.create({
        username: data.phone,
        password: '12345678',
        userType: 1,
        ...data
    }).then(async result => {
        data.userID = result._id
        await Employees.create(data)
        return result
    })
}

function update(id, data) {
    return Employees.update({
        _id: ObjectId(id)
    }, data)
}

function deleteOne(id) {
    return Employees.update({
        _id: ObjectId(id)
    }, {
        isDeleted: true
    })
}

function removeOne(id) {
    return Employees.remove({
        _id: ObjectId(id)
    })
}