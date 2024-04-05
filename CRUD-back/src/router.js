const express = require('express')
const router = express.Router()

const UsuarioRouter = require('./usuario/usuario.router.js')
const TokenRouter = require('./token/token.router.js')
const ClienteRouter = require('./cliente/cliente.router.js')

router.use('/usuarios', UsuarioRouter)
router.use('/token', TokenRouter)
router.use('/clientes', ClienteRouter)

module.exports = router