const ClienteService = require('./cliente.service')

module.exports = class ClienteController {
    static async listar(req, res) {
        try {
            const {usuarioId} = req.query
            const clientes = await ClienteService.listarClientes(usuarioId)
            res.status(200).json(clientes)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    static async criar(req, res) {
        try {
            const novoCliente = await ClienteService.criarCliente(req.body)
            res.status(201).json(novoCliente)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}