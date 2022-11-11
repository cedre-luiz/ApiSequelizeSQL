// Importar
const {Router} = require('express');
const { deletaNivel } = require('../controller/NivelController.js');
const NivelController = require('../controller/NivelController.js')

//Ativando o express
const router = Router();

//Verbos e rotas
router.get('/nivel', NivelController.pegaTodosNiveis)
router.get('/nivel/:id', NivelController.pegaUmNivel)
router.post('/nivel', NivelController.criaNivel)
router.put('/nivel/:id', NivelController.atualizaNivel)
router.delete('/nivel/:id', NivelController.deletaNivel)
//Restaurar
router.post('/niveis/:id/restaura', NivelController.restauraNivel)

//Exportar
module.exports = router