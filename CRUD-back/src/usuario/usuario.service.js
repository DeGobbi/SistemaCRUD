const Usuario = require('../../models/Usuario')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = class UsuarioService {
    static async listarUsuarios() {
        try {
            const usuarios = await Usuario.findAll()
            return usuarios
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async criarUsuario(email, senha) {
        if (!email || !senha)
            throw new Error('Credenciais inválidas');

        try {

            const usuarioExiste = await Usuario.findOne({ where: { email } })

            if (usuarioExiste)
                throw new Error('Esse email já existe!')
            
            const isAdmin = await Usuario.findOne({where: { admin: true}})
            
            const hashedSenha = await bcrypt.hash(senha, 10)

            const novoUsuario = await Usuario.create({
                email,
                senha: hashedSenha,
                admin: isAdmin ? false : true
            });

            return novoUsuario
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async logarUsuario(email, senha) {
        if (!email || !senha)
            throw new Error('Credenciais inválidas');

        try {
            const usuario = await Usuario.findOne({ where: { email } })
            if (!usuario)
                throw new Error('Verifique seus dados e tente novamente')
            
            const senhaCorrespondente = await bcrypt.compare(senha, usuario.senha)
            if (!senhaCorrespondente) 
                throw new Error('Verifique seus dados e tente novamente')
            
            return jwt.sign({ id: usuario.id, email: usuario.email }, '976455d8ca83c51969f1579b3f7427b8c5c493d1d2941c021199566bb9f7862a', { expiresIn: '1h' })
            
        } catch (error) {
            throw new Error(error.message)
        }
    }
}