//Bibliotecas
const express = require('express');
const routes = require('./routes')

//metodos da biblioteca
const app = express();
const port = 3000;

routes(app)

app.listen(port, ()=> console.log(`Servidor na porta ${port}`))
 
module.export = app;
