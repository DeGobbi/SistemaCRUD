const jwt = require('jsonwebtoken')

module.exports = class TokenService {
    static async validarToken(token) {
        try {
            const isValid = jwt.verify(token, '976455d8ca83c51969f1579b3f7427b8c5c493d1d2941c021199566bb9f7862a')
            return isValid
        } catch (error) {
            throw new Error(error.message)
        }
    }
}