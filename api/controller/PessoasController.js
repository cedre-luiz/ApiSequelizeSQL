// const database = require('../models');
const Sequelize = require('sequelize')
const {PessoasServices} = require('../services')
const pessoasServices = new PessoasServices()
const { MatriculasServices} = require('../services')
const matriculasServices = new MatriculasServices()

//Definindo CRUD
class PessoaController{

    // R = Read - Buscar Registro - Refatorado
   static async pegaPessoasAtivas(req,res){
    try{
        //const pessoasAtivas = await database.Pessoas.findAll()
        const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
        return res.status(200).json(pessoasAtivas)
    }catch(error){
        return res.status(500).json(error.mensage)
     }
    }

    // Refatorado
    static async pegaTodasAsPessoas(req,res){
     try{
        const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
        return res.status(200).json(todasAsPessoas)
     }catch(error){
        return res.status(500).json(error.mensage)
     }
    }

    // Refatorado
    static async pegaUmaPessoa(req,res){
        const{id} = req.params
        try{
            const umaPessoa = await pessoasServices.pegaUmRegistro({id})
            return res.status(200).json(umaPessoa)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    //Refatorado
    // C = Create - Criar registro
    static async criarPessoa(req,res){
        const novaPessoa = req.body
        try{
            //const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            const novaPessoaCriada = await pessoasServices
            .criarRegistro(novaPessoa)            
            return res.status(200).json(novaPessoaCriada)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
    // U = Update - Atualizar um registro
    static async atualizaPessoa(req,res){
        const {id} = req.params
        const novaInfo = req.body
        try{
            await pessoasServices.atualizaRegistro(novaInfo, Number(id))
            return res.status(200).json({mensagem: `Id ${id} foi atualizado`}) 
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
    // D = Delete - Excluir um registro
    static async deletarPessoa(req,res){
        const {id} = req.params
        try{
            await pessoasServices.apagaRegistro(Number(id))
            return res.status(200).json({mensagem:`Registro ${id} foi deletado`})
        }catch{
            return res.status(500).json(error.mensage)
        }
    }

    //Refatorado
    //Restaurar Um Registro
    static async restauraPessoa(req,res){
        const {id} = req.params
        try{
            const registroRestaurado = await pessoasServices.restauraRegistro(Number(id))
            return res.status(200).json(registroRestaurado)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }



     
    //Controlador de Matricula

    //R = Read - Buscando uma Matricula
    //http://localhost:3000/pessoa/1/matricula/5
    //http://localhost:3000/pessoa/:estudanteId/matricula/:matriculaId    
    
    // Refatorado
    static async pegaMatriculas(req,res){
        const {estudanteId} = req.params
        try{
           const matriculas = await pessoasServices
            .pegaMatriculaPorEstudante({id:Number(estudanteId)})
           return res.status(200).json(matriculas);
        }catch{
            return res.status(500).json(error.mensage)
        }
    }

    //Refatorado
    static async pegaUmaMatricula(req,res){
        const{estudanteId, matriculaId} = req.params
        try{
            const umaMatricula = await matriculasServices
            .pegaUmRegistro({id:(matriculaId), estudante_id:(estudanteId)})
            return res.status(200).json(umaMatricula)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
    //C = Create - Criar Matricula
    static async criarMatricula(req,res){
        const { estudanteId} = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try{
            const novaMatriculaCriada = await matriculasServices
                .criarRegistro(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
     // U = Update - Atualizar uma Matricula
     static async atualizaMatricula(req,res){
        const {estudanteId, matriculaId} = req.params
        const novaInfo = req.body
        try{
            await matriculasServices.atualizaRegistro(novaInfo,
                { id: Number(matriculaId), estudante_id: Number(estudanteId) })
            return res.status(200).json({mensagem: `id ${matriculaId} atualizado`}) 
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
    //D= Delete - Excluir Matricula
    static async deletarMatricula(req,res){
        const {matriculaId} = req.params
        try{
            await matriculasServices.apagaRegistro(Number(matriculaId))
            return res.status(200).json({mensagem:`Registro ${matriculaId} foi deletado`})
        }catch{
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
    static async restauraMatricula(req, res) {
        const { matriculaId } = req.params
        try {
          await matriculasServices.restauraRegistro(Number(matriculaId))
          return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }
    //
    // static async pegaMatriculas(req,res){
    //     const {estudanteId} = req.params
    //     try{
    //         const matriculas = await database.Matriculas.findAll({where: {
    //             estudante_id:Number(estudanteId)
    //         }})
    //         return res.status(200).json(matriculas)
    //     }catch{
    //         return res.status(500).json(error.mensage)
    //     }
    // }


    // Refatorado
    // Busca por matriculas en cada turma
    static async pegaMatriculasPorTurma(req,res){
        const {turmaId} = req.params
        try{
            const todasAsMatriculas = await matriculasServices
            .encontraEContaRegistros({
                    turma_id: Number(turmaId),
                    status : 'confirmado'
                },{
                limit: 20,
                order: [['estudante_id', 'ASC']]  })
            return res.status(200).json(todasAsMatriculas)
        }catch{
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
    // Definindo turmas Lotadas
    static async pegaTurmasLotadas(req,res){
        const lotacaoTurma = 2
        try{
            const turmasLotadas = await matriculasServices
            .encontraEContaRegistros({ status: 'confirmado' },{
                attributes:['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas)
        }catch{
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
    //Cancelamento de Matricula utilizando .transaction
    static async cancelaPessoa(req,res){
        const {estudanteId} = req.params
        try{
            await pessoasServices.cancelaPessoaEMatricula(Number(estudanteId))            
            return res.status(200).json({mensage: `Matriculas do estudante ${estudanteId} canceladas`})
            }
        catch{
            return res.status(500).json(error.mensage)
        }
    }
}

module.exports = PessoaController;