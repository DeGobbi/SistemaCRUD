const ClienteService = require('./cliente.service')

module.exports = class ClienteController {
    static async listar(req, res) {
        try {
            const {clienteId} = req.query
            const usuarioId = req.user.id
            if(clienteId) {
                const cliente = await ClienteService.listarCliente(clienteId, usuarioId)
                res.status(200).json(cliente)
                return
            }
            const clientes = await ClienteService.listarClientes(usuarioId)
            res.status(200).json(clientes)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    static async criar(req, res) {
        try {
            const novoCliente = await ClienteService.criarCliente(req.body, req.user.id)
            res.status(201).json(novoCliente)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async editar(req, res) {
        try {
            const {clienteData, clienteId} = req.body
            const clienteEditado = await ClienteService.editarCliente(clienteData, clienteId, req.user.id)
            res.status(200).json(clienteEditado)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}