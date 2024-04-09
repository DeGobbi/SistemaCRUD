const express = require('express')
const router = express.Router()
const UsuarioController = require('./usuario.controller')

// router.get('/', UsuarioController.listar)
router.post('/cadastrar', UsuarioController.criar)
router.post('/login', UsuarioController.logar)
// router.post('/deletar', authorize, UsuarioController.logar)


module.exports = router
