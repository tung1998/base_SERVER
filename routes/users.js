const express = require('express');
const router = express.Router();
const Users = require('../model/users')

router.get('/', (req, res, next) => {
    Users.getAll().then(result => {
        res.send(result)
    }).catch(error => {
        res.send(error)
    })
});

router.get('/checkAccessToken', (req, res, next) => {
    let accessToken = req.headers.accesstoken || ''
    if (accessToken)
        Users.getByAccessToken(accessToken).then(result => {
            if (result) {
                let {
                    _id,
                    username,
                    userType
                } = result
                res.send({
                    _id,
                    username,
                    userType
                })
            } else res.status(404).send({
                error: error,
                message: 'AccessToken not found!!'
            })
        }).catch(error => {
            res.status(404).send({
                error: error,
                message: 'AccessToken not found!!'
            })
        })
    else res.status(404).send({
        message: 'AccessToken not found!!'
    })
});

router.get('/:id(\[0-9a-fA-F]{24})', (req, res, next) => {
    let id = req.params.id
    Users.getByID(id).then(result => {
        res.send(result)
    }).catch(error => {
        res.send(error)
    })
});

router.get('/getByAccessToken/:accessToken', (req, res, next) => {
    let accessToken = req.params.accessToken
    Users.getByAccessToken(accessToken).then(result => {
        res.send(result)
    }).catch(error => {
        res.send(error)
    })
});

router.post('/', (req, res, next) => {
    Users.create(req.body).then(result => {
        console.log(result)
        res.send(result)
    }).catch(error => {
        res.status(404).send(error)
    })
});

router.put('/:id(\[0-9a-fA-F]{24})', (req, res, next) => {
    let id = req.params.id
    Users.update(id, {
        $set: req.body
    }).then(result => {
        console.log(result)
        res.send(result)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
});

router.delete('/:id(\[0-9a-fA-F]{24})', (req, res, next) => {
    let id = req.params.id
    Users.deleteOne(id).then(result => {
        console.log(result)
        res.send(result)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
});

router.post('/changePassword/:id(\[0-9a-fA-F]{24})', (req, res, next) => {
    let id = req.params.id
    let newPassword = req.body.password
    Users.changePassword(id, newPassword).then(result => {
        console.log(result)
        res.send(result)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
});

router.post('/changePassword', (req, res, next) => {
    let id = req.user._id
    let newPassword = req.body.password
    console.log(id, newPassword)
    Users.changePassword(id, newPassword).then(result => {
        console.log(result)
        res.send(result)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
});


router.post('/login', (req, res, next) => {
    let {
        username,
        password
    } = req.body
    Users.login(username, password).then(result => {
        res.send(result)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
});


router.post('/deleteAccesstoken', (req, res, next) => {
    let id = req.user._id
    Users.deleteAccessToken(id).then(result => {
        res.send("result")
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
});


module.exports = router;