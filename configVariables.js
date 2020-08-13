module.exports = {
    _PERMISSION
}

function _PERMISSION() {
    return {
        MANAGER: [
            //users
            /GET \/users/,
            /GET \/users\/[0-9a-fA-F]{24}/,
            /PUT \/users\/[0-9a-fA-F]{24}/,
            /POST \/users/,
            /DELETE \/users\/[0-9a-fA-F]{24}/,
            /GET \/users\/getByAccessToken\/[0-9a-fA-F]+/,
            /POST \/users\/changePassword\/[0-9a-fA-F]{24}/,
            //employees
            /GET \/employees/,
            /GET \/employees\/[0-9a-fA-F]{24}/,
            /PUT \/employees\/[0-9a-fA-F]{24}/,
            /POST \/employees/,
            /DELETE \/employees\/[0-9a-fA-F]{24}/,
        ],
        All: [
            /GET \/users\/checkAccessToken/,
            /POST \/users\/changePassword/,
            /POST \/users\/deleteAccesstoken/,
        ],
        NO_RULE: [
            /POST \/users\/login/,
            /GET \/view.*/
        ]
    }
}