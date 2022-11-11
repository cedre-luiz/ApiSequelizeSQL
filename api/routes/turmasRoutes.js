// Importar
const {Router} = require('express');
const TurmaController = require('../controller/TurmaController.js');
const { deletaTurma } = require('../controller/TurmaController.js');


//Ativando o express
const router = Router();

//Verbos e rotas
router.get('/turma', TurmaController.pegaTodasTurmas)
router.get('/turma/:id', TurmaController.pegaUmaTurma)
router.post('/turma', TurmaController.criarTurma)
router.put('/turma/:id', TurmaController.atualizaTurma)
router.delete('/turma/:id', TurmaController.deletaTurma)
//Resataurar
router.post('/turmas/:id/restaura', TurmaController.restauraTurma)

//Exportar
module.exports = router