// Importar
const {Router} = require('express');
const TurmaController = require('../controller/TurmaController.js');
const { deletaTurma } = require('../controller/TurmaController.js');


//Ativando o express
const router = Router();

//Verbos e rotas
router
    .get('/turma', TurmaController.pegaTodasTurmas)
    .get('/turma/:id', TurmaController.pegaUmaTurma)
    .post('/turma', TurmaController.criarTurma)
    .post('/turma/:id/restaura', TurmaController.restauraTurma)
    .put('/turma/:id', TurmaController.atualizaTurma)
    .delete('/turma/:id', TurmaController.deletaTurma)

    

//Exportar
module.exports = router