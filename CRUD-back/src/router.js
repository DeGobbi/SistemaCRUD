const express = require('express')
const router = express.Router()

const UsuarioRouter = require('./usuario/usuario.router.js')
const TokenRouter = require('./token/token.router.js')

router.use('/usuarios', UsuarioRouter)
router.use('/token', TokenRouter)

module.exports = router