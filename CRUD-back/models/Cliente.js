const { DataTypes } = require('sequelize')
const sequelize = require('../config')
const Usuario = require('./Usuario')

const Cliente = sequelize.define('Cliente', {
    razao_social: {
        type: DataTypes.STRING,
        allowNull: false
    },
    natureza: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pj_cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pf_cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    log_criacao_usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    log_atualizacao_usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Usuario.hasMany(Cliente)
Cliente.belongsTo(Usuario)

module.exports = Cliente