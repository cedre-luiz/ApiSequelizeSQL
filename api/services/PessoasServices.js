const Services = require('./Services.js')
const database = require('../models')

// Metodos especificos para o controlador de Pessoas
class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async pegaRegistrosAtivos(where = {}){
        return database[this.nomeDoModelo].findAll({where: {...where }})
    }

    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo]
            .scope('todos')
            .findAll({where: {...where}})
    }

    async cancelaPessoaEMatricula(estudanteId){
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ativo: false},estudanteId, {
                transaction: transacao})
            await this.matriculas.atualizaRegistros({status: 'cancelado'},{estudante_Id: estudanteId}, {transaction:transacao})
        }


        )
    }

    async pegaMatriculaPorEstudante(where = {}){
        const matriculas = await database[this.nomeDoModelo]
            .findOne({where:{...where}})
        return matriculas.getAulasMatriculadas()
    }
}

module.exports = PessoasServices