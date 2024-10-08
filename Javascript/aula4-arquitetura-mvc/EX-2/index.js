//Importar o Express pra nossa aplicação
// npx (executar pacotes)
// npm start (abreviação do npx nodemon index.js que roda o projeto)
// const express = require("express"); //CommonJS Modules
import express from 'express' // ES6 Modules
//criando uma instância do express
const app = express();

// Importando os Controllers (onde estao rotas)
import ClientesController from "./controllers/ClientesController.js"
 
app.set('view engine','ejs')
// Definindo o EJS como renderizador de paginas;

// Definir a pasta dos arquivos estáticos (public)
app.use(express.static('public'))

//Definindo o uso das rotas que estao nos controllers
app.use("/", ClientesController)


//criando a ROTA PRINCIPAL
app.get("/", (req, res) => {
  // Será renderizada a pagina index.ejs que esta na pasta 'views'
  res.render('index');
});
 

 
//iniciando o servidor na porta 8080
app.listen(8080, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log("Servidor iniciado com sucesso.");
  }
});
 