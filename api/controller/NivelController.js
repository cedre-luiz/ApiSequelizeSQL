const database = require('../models')

//Definindo CRUD para Nivel
class NivelController{
    //R - Read - buscar no banco - todos os registros
    static async pegaTodosNiveis(req,res){
        try{
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }
    //R - Read - buscar no banco - um registro
    static async pegaUmNivel(req,res){
        const{id} = req.params
        try{
            const umNivel = await database.Niveis.findOne({
                where:{id:Number(id)}
            })
            return res.status(200).json(umNivel)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }
    //C - Create - Criar um registro
    static async criaNivel(req,res){
        const novoNivel = req.body
        try{
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(novoNivelCriado)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }
    //U - Update - Atualizar um registro
    static async atualizaNivel(req,res){
        const {id} = req.params
        const novoNivel = req.body
        try{
            await database.Niveis.update(novoNivel,{
                where:{id:Number(id)}
            })
            const nivelAtualizado = await database.Niveis.findOne({
                where:{id:Number(id)}
            })
            return res.status(200).json(nivelAtualizado)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }
    //D - Delete - Excluir um registro
    static async deletaNivel(req,res){
        const {id} = req.params
        try{
            await database.Niveis.destroy({
                where:{id:Number(id)}
            })
            return res.status(200).json({
                mensagem: `Registro ${id} foi deletado`
            })
        }catch(error){
            return res.staus(500).json(error.mensage)
        }
    }
    //Restaurar
    static async restauraNivel(req, res) {
        const { id } = req.params
        try {
          await database.Niveis.restore( {where: { id: Number(id) } } )
          return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
}

module.exports = NivelController;