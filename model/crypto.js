const Crypto = require('crypto')

module.exports = {
    encodeSHA256,
    random64Bytes,
}

function encodeSHA256(text, update = '') {
    return Crypto.createHmac("sha256", text).update(update).digest('hex')
}

function random64Bytes() {
    return new Promise((resolve, rejects) => {
        Crypto.randomBytes(64, (err, buf) => {
            if (err) rejects(err)
            else resolve(buf.toString('hex'))
        })
    })
}