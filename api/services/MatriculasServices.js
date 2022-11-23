const Services = require('./Services.js')

// Metodos especificos para o controlador de Matriculas
class MatriculasServices extends Services {
    constructor(){
        super('Matriculas')
    }

}

module.exports = MatriculasServices