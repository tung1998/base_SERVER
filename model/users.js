const mongoose = require('mongoose');
const Crypto = require('./crypto')
const ObjectId = mongoose.Types.ObjectId

const USERS = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    password: String,
    salt: String,
    accessToken: String,
    userType: {
        type: Number,
        default: 1
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    name: String,
    phone: String,
    email: String,
    dateOfBirth: String,
    sex: String,
    address: String,
    createdAt: {
        type: Number,
        default: Date.now()
    },
    updatedAt: {
        type: Number,
        default: Date.now()
    }
});

const Users = mongoose.model('Users', USERS);

module.exports = {
    getAll,
    getByID,
    create,
    update,
    deleteOne,
    getByAccessToken,
    changePassword,
    login,
    deleteAccessToken,
    createAccesstoken
}

function getAll() {
    return Users.find({
        isDeleted: false,
        userType: 1,
    }).select({ userType: 1, _id: 1, username: 1, name: 1, phone: 1, email: 1, dateOfBirth: 1, address: 1, sex: 1 })
}

function getByID(id) {
    return Users.findOne({
        _id: ObjectId(id),
        isDeleted: false,
    }).select({ userType: 1, _id: 1, username: 1, name: 1, phone: 1, email: 1, dateOfBirth: 1, address: 1, sex: 1 })
}

function getByAccessToken(accessToken) {
    return Users.findOne({
        accessToken,
        isDeleted: false
    })
}

async function create(data) {
    data.accessToken = await Crypto.random64Bytes()
    data.salt = await Crypto.random64Bytes()
    data.password = Crypto.encodeSHA256(data.password, data.salt)
    return Users.findOneAndUpdate({
        username: data.username
    }, data, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false
    })
}

function update(id, data) {
    return Users.update({
        _id: ObjectId(id)
    }, data)
}

function deleteOne(id) {
    return Users.update({
        _id: ObjectId(id)
    }, {
        isDeleted: true
    })
}

async function changePassword(id, newPass) {
    try {
        accessToken = await Crypto.random64Bytes()
        salt = await Crypto.random64Bytes()
        password = Crypto.encodeSHA256(newPass, salt)
        return Users.update({
            _id: id
        }, {
            salt,
            accessToken,
            password
        })
    } catch (error) {
        throw error
    }
}

function login(username, password) {
    return Users.findOne({
        username,
        isDeleted: false
    }).then(async user => {
        let hashPassword = Crypto.encodeSHA256(password, user.salt)
        if (hashPassword == user.password) {
            let {
                _id,
                userType,
                username,
            } = user
            let accessToken =await createAccesstoken(_id)
            return {
                success: true,
                userID: _id,
                username,
                userType,
                message: 'Success',
                accessToken
            }
        } else return {
            success: false,
            message: 'Wrong password!'
        }
    }).catch(error => {
        return {
            success: false,
            message: 'User not found!'
        }
    })
}


async function createAccesstoken(id) {
    accessToken = await Crypto.random64Bytes()
    await Users.update({
        _id: ObjectId(id)
    }, {
        accessToken
    })
    return accessToken
}

function deleteAccessToken(id) {
    return Users.update({
        _id: ObjectId(id)
    }, {
        accessToken: ""
    })
}


