const express = require('express')
const router = express.Router()
const TokenController = require('./token.controller')

router.post('/', TokenController.validar)

module.exports = router
