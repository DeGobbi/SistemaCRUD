const express = require('express')
const app = express()
const router = require('./src/router.js')
const sequelize = require('./config.js')
const cors = require('cors')


app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(router)

const PORT = process.env.PORT || 3000

sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch(console.log)