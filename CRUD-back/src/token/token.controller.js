const TokenService = require('./token.service')

module.exports = class TokenController {
    static async validar(req, res) {
        try {
            const {token} = req.body
            const isValid = await TokenService.validarToken(token)
            res.status(200).json(isValid)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}