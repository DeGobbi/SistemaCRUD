const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');

const Usuario = sequelize.define('Usuario', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
})

module.exports = Usuario;
