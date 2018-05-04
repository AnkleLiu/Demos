/**
 * Created by Uncle Liu on 2018/5/2.
 */
const crypto = require('crypto')
const Model = require('./main')
const { key } = require('../utils')

class Session extends Model {
    constructor(form={}) {
        super()
        this.key = key
        this.algorithm = 'aes-256-cbc'
        this.input = 'utf8'
        this.output = 'hex'
        this.content = form
    }

    decrypt(c) {
        var decipher = crypto.createDecipher(this.algorithm, key)
        var d = decipher.update(c, this.output, this.input)
        d += decipher.final(this.input)
        const r = JSON.parse(d)
        return r
    }

    encrypt(form) {
        const s = JSON.stringify(form)
        const cipher = crypto.createCipher(this.algorithm, key)
        let c = cipher.update(s, this.input, this.output)
        c += cipher.final(this.output)
        return c
    }
}

const session = new Session()

module.exports = session