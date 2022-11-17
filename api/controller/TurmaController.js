const database = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//Definindo CRUD para Turma
class TurmaController{
    //R - Read - buscar no banco - todos os registros - com filtro por data
    static async pegaTodasTurmas(req,res){
        const {data_inicial , data_final} = req.query
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null;
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
        data_final ? where.data_inicio[Op.lte] = data_final : null;
        try{
            const todosAsTrumas = await database.Turmas.findAll({where})
            return res.status(200).json(todosAsTrumas)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    //R - Read - buscar no banco - um registro
    static async pegaUmaTurma(req,res){
        const{id} = req.params
        try{
            const umaTurma = await database.Turmas.findOne({
                where:{id:Number(id)}
            })
            return res.status(200).json(umaTurma)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }
    //C - Create - Criar um registro
    static async criarTurma(req,res){
        const novaTurma = req.body
        try{
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }
    //U - Update - Atualizar um registro
    static async atualizaTurma(req,res){
        const {id} = req.params
        const novaTurma = req.body
        try{
            await database.Turmas.update(novaTurma,{
                where:{id:Number(id)}
            })
            const turmaAtualizada = await database.Turmas.findOne({
                where:{id:Number(id)}
            })
            return res.status(200).json(turmaAtualizada)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }
    //D - Delete - Excluir um registro
    static async deletaTurma(req,res){
        const {id} = req.params
        try{
            await database.Turmas.destroy({
                where:{id:Number(id)}
            })
            return res.status(200).json({
                mensagem: `Registro ${id} foi deletado`
            })
        }catch(error){
            return res.staus(500).json(error.mensage)
        }
    }
    //Restaura
    static async restauraTurma(req, res) {
        const { id } = req.params
        try {
          await database.Turmas.restore( {where: { id: Number(id) } } )
          return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
}

module.exports = TurmaController;