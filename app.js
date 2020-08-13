const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookie = require('cookie');
const logger = require('morgan');
const mongoose = require('mongoose');

//colection
const Users = require('./model/users')
const Variable = require('./configVariables')

//router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const managersRouter = require('./routes/managers');
const viewRouter = require('./routes/view');
const app = express();

const Managers = require('./model/managers')
//connect mongoose
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

Managers.initAdministrator()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
req.ip = getIP(req)
res.header("Access-Control-Allow-Origin", "*")
res.header("Access-Control-Allow-Headers", "*")
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
next()
})

app.use(checkUser);



//add router
app.use('/users', usersRouter);
app.use('/managers', managersRouter);
app.use('/view', viewRouter);

// app.use('/login', loginRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({
        error: 'Page not found'
    });
});



function checkUser(req, res, next) {
    let _PERMISSION = Variable._PERMISSION()
    let url = `${req.method} ${req.originalUrl}`
    if (checkPermission(url, _PERMISSION.NO_RULE)) next()
    else {
        let accessToken = req.headers.accesstoken || ''
        if (accessToken) {
            Users.getByAccessToken(accessToken).then(user => {
                req.user = user
                if ((user.userType == 0 && checkPermission(url, _PERMISSION.MANAGER)) || (user.userType == 1 && checkPermission(url, _PERMISSION.STUDENT)) || checkPermission(url, _PERMISSION.ALL))
                    next()
                else res.send({
                    error: 'you have not permission to access!'
                }).end()
            }).catch(error => {
                res.send({
                    error: 'you have not permission to access!'
                }).end()
            })
        } else {
            res.send({
                error: 'you have not permission to access!'
            }).end()
        }
    }
}

function checkPermission(string, expressions) {
    var len = expressions.length;
    for (i = 0; i < len; i++) {
        if (expressions[i].test(string)) {
            return true;
        }
    }
    return false;
};

function getIP(req) {
    return (req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : '')).split(",")[0]
}

module.exports = app;