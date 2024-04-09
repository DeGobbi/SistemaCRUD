const Cliente = require('../../models/Cliente')

module.exports = class ClienteService {
    static async listarClientes(UsuarioId) {
        if (!UsuarioId)
            throw new Error('Usuário não encontrado');
        try {
            const clientes = await Cliente.findAll({
                where: { UsuarioId }
            })
            return clientes
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async listarCliente(id, UsuarioId) {
        if (!UsuarioId)
            throw new Error('Usuário não encontrado');
        if (!id)
            throw new Error('Cliente não encontrado');
        try {
            const cliente = await Cliente.findOne({
                where: { id }
            })
            if(UsuarioId != cliente.UsuarioId)
                throw new Error('O cliente não pertence a este usuário')
            return cliente
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async criarCliente(cliente) {
        if(!cliente) {
            throw new Error('Sem dados do cliente!');
        }
        try {
            const {
                razao_social,
                natureza,
                pj_cnpj,
                pf_cpf,
                telefone
            } = cliente.clienteData
            const UsuarioId = cliente.UsuarioId
            const novoCliente = await Cliente.create({
                razao_social,
                natureza,
                pj_cnpj,
                pf_cpf,
                telefone,
                log_criacao_usuario_id: UsuarioId,
                log_atualizacao_usuario_id: UsuarioId,
                UsuarioId,
            })
            return novoCliente
        } catch (error) {
            throw new Error(error.message)
        }
    }
}