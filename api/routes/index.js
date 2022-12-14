const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoutes')
const turmas = require('./turmasRoutes')

module.exports = app=> {
    app.use(bodyParser.json())
    app.use(pessoas)
    app.use(niveis)
    app.use(turmas)
    app.get('/', (req,res) => res.send('Bora pro API'))
}