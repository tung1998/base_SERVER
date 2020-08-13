const express = require('express');
const router = express.Router();
const Employees = require('../model/employees')

router.get('/', (req, res, next) => {
    Employees.getAll().then(result => {
        res.send(result)
    }).catch(error => {
        res.send(error)
    })
});

router.get('/:id(\[0-9a-fA-F]{24})', (req, res, next) => {
    let id = req.params.id
    Employees.getByID(id).then(result => {
        res.send(result)
    }).catch(error => {
        res.send(error)
    })
});

router.post('/', (req, res, next) => {
    console.log(req.body)
    let {
        name,
        dateOfBirth,
        phone,
        email,
        sex,
        address
    } = req.body
    Employees.create({
        name,
        dateOfBirth,
        phone,
        email,
        sex,
        address
    }).then(result => {
        console.log(result)
        res.send(result)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
});

router.put('/:id(\[0-9a-fA-F]{24})', (req, res, next) => {
    let id = req.params.id
    let {
        name,
        dateOfBirth,
        phone,
        email,
        sex,
        address
    } = req.body
    Employees.update(id, {
        name,
        dateOfBirth,
        phone,
        email,
        sex,
        address
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
    Employees.deleteOne(id).then(result => {
        console.log(result)
        res.send(result)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
});

module.exports = router;