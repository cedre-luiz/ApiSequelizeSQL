const database = require('../models');
const Sequelize = require('sequelize')

//Definindo CRUD
class PessoaController{

    // R = Read - Buscar Registro
   static async pegaPessoasAtivas(req,res){
    try{
        const pessoasAtivas = await database.Pessoas.findAll()
        return res.status(200).json(pessoasAtivas)
    }catch(error){
        return res.status(500).json(error.mensage)
     }
    }

    static async pegaTodasAsPessoas(req,res){
     try{
        const todasAsPassoas = await database.Pessoas.scope('todos').findAll()
        return res.status(200).json(todasAsPassoas)
     }catch(error){
        return res.status(500).json(error.mensage)
     }
    }

    static async pegaUmaPessoa(req,res){
        const{id} = req.params
        try{
            const umaPessoa = await database.Pessoas.findOne({
                where:{id:Number(id)}
            })
            return res.status(200).json(umaPessoa)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // C = Create - Criar registro
    static async criarPessoa(req,res){
        const novaPessoa = req.body
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // U = Update - Atualizar um registro
    static async atualizaPessoa(req,res){
        const {id} = req.params
        const novaInfo = req.body
        try{
            await database.Pessoas.update(novaInfo, {
                where: {id:Number(id)}
            })
            const pessoaAtualizada = await database.Pessoas.findOne({
                where:{id:Number(id)}
            })
            return res.status(200).json(pessoaAtualizada) 
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }
    // D = Delete - Excluir um registro
    static async deletarPessoa(req,res){
        const {id} = req.params
        try{
            await database.Pessoas.destroy({where: {
                id:Number(id)
            }})
            return res.status(200).json({mensagem:`Registro ${id} foi deletado`})
        }catch{
            return res.status(500).json(error.mensage)
        }
    }

    //Restaurar Um Registro
    static async restauraPessoa(req,res){
        const {id} = req.params
        try{
            await database.Pessoas.restore({
                where:{id:Number(id)}
            })
            return res.status(200).json({mensagem:`ID ${id} restaurado com sucesso`})
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

     
    //Controlador de Matricula

    //R = Read - Buscando uma Matricula
    //http://localhost:3000/pessoa/1/matricula/5
    //http://localhost:3000/pessoa/:estudanteId/matricula/:matriculaId
    static async pegaUmaMatricula(req,res){
        const{estudanteId, matriculaId} = req.params
        try{
            const umaMatricula = await database.Matriculas.findOne({
                where:{
                    id:Number(matriculaId),
                    estudante_id:Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    //C = Create - Criar Matricula
    static async criarMatricula(req,res){
        const { estudanteId} = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

     // U = Update - Atualizar uma Matricula
     static async atualizaMatricula(req,res){
        const {estudanteId, matriculaId} = req.params
        const novaInfo = req.body
        try{
            await database.Matriculas.update(novaInfo, {
                where: {
                    id:Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            const matriculaAtualizada = await database.Matriculas.findOne({
                where:{
                    id:Number(matriculaId)
                    }
            })
            return res.status(200).json(matriculaAtualizada) 
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    //D= Delete - Excluir Matricula
    static async deletarMatricula(req,res){
        const {estudanteId, matriculaId} = req.params
        try{
            await database.Matriculas.destroy({where: {
                id:Number(matriculaId),
                estudante_id: Number(estudanteId)
            }})
            return res.status(200).json({mensagem:`Registro ${matriculaId} foi deletado`})
        }catch{
            return res.status(500).json(error.mensage)
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
          await database.Matriculas.restore({
            where: {
              id: Number(matriculaId),
              estudante_id: Number(estudanteId)
            }
          })
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

    static async pegaMatriculas(req,res){
        const {estudanteId} = req.params
        try{
           const pessoa = await database.Pessoas.findOne({where: {
            id: Number(estudanteId)
           }});
           const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        }catch{
            return res.status(500).json(error.mensage)
        }
    }
    
    // Busca por matriculas en cada turma
    static async pegaMatriculasPorTurma(req,res){
        const {turmaId} = req.params
        try{
            const todasAsMatriculas = await database.Matriculas
            .findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status : 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            })
            return res.status(200).json(todasAsMatriculas)
        }catch{
            return res.status(500).json(error.mensage)
        }
    }

    static async pegaTurmasLotadas(req,res){
        const lotacaoTurma = 2
        try{
            const turmasLotadas = await database.Matriculas
            .findAndCountAll({
                where:{
                    status: 'confirmado'
                },
                attributes:['turma_id'],
                group: ['turma_id'],
                having: Sequelize
                .literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas)
        }catch{
            return res.status(500).json(error.mensage)
        }
    }
}

module.exports = PessoaController;