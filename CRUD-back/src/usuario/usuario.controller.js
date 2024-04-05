const UsuarioService = require('./usuario.service')

module.exports = class UsuarioController {
    static async listar(req, res) {
        try {
            const usuarios = await UsuarioService.listarUsuarios()
            res.status(200).json(usuarios)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    static async criar(req, res) {
        try {
            const {email, senha} = req.body
            const novoUsuario = await UsuarioService.criarUsuario(email, senha)
            res.status(201).json(novoUsuario)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async logar(req, res) {
        try {
            const {email, senha} = req.body
            const token = await UsuarioService.logarUsuario(email, senha)
            res.status(200).json({ token })
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}