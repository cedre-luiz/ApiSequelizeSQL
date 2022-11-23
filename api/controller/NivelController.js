//const database = require('../models')
const Services = require('../services/Services.js')
const niveisServices = new Services('Niveis')

//Definindo CRUD para Nivel
class NivelController{

    // Refatorado
    //R - Read - buscar no banco - todos os registros
    static async pegaTodosNiveis(req,res){
        try{
            //const todosOsNiveis = await database.Niveis.findAll()
            const todosOsNiveis = await niveisServices.pegaTodosOsRegistros()
            return res.status(200).json(todosOsNiveis)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
    //R - Read - buscar no banco - um registro
    static async pegaUmNivel(req,res){
        const{id} = req.params
        try{
            const umNivel = await niveisServices.pegaUmRegistro({id})
            return res.status(200).json(umNivel)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // Rafatorado
    //C - Create - Criar um registro
    static async criaNivel(req,res){
        const novoNivel = req.body
        try{
            const novoNivelCriado = await niveisServices.criarRegistro(novoNivel)
            return res.status(200).json(novoNivelCriado)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
    //U - Update - Atualizar um registro
    static async atualizaNivel(req,res){
        const {id} = req.params
        const novoNivel = req.body
        try{
            await niveisServices.atualizaRegistro(novoNivel, Number(id))
            return res.status(200).json(nivelAtualizado)
        }catch(error){
            return res.status(500).json(error.mensage)
        }
    }

    // Refatorado
    //D - Delete - Excluir um registro
    static async deletaNivel(req,res){
        const {id} = req.params
        try{
            await niveisServices.apagaRegistro(id)
            return res.status(200).json({mensagem: `Registro ${id} foi deletado`
            })
        }catch(error){
            return res.staus(500).json(error.mensage)
        }
    }

    // Refatorado
    //Restaurar
    static async restauraNivel(req, res) {
        const { id } = req.params
        try {
          const registroRestaurado = await niveisServices.restauraRegistro(Number(id))
          return res.status(200).json(registroRestaurado)
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
}

module.exports = NivelController;