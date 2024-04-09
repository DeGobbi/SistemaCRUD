const express = require('express')
const router = express.Router()
const ClienteController = require('./cliente.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/', authMiddleware, ClienteController.listar)
router.post('/', authMiddleware, ClienteController.criar)
router.put('/', authMiddleware, ClienteController.editar)
router.delete('/', authMiddleware, ClienteController.excluir)

module.exports = router
