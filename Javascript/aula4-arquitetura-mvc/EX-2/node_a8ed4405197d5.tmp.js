//Importar o Express pra nossa aplicação
// npx (executar pacotes)
// npm start (abreviação do npx nodemon index.js que roda o projeto)
const express = require("express"); //CommonJS Modules
//criando uma instância do express
const app = express();
 
app.set('view engine','ejs')
// Definindo o EJS como renderizador de paginas;
//criando a rota principal
app.get("/", (req, res) => {
  // Será renderizada a pagina index.ejs que esta na pasta 'views'
  res.render('index');
});
 
//ROTA PERFIL
app.get("/perfil/:nome?",(req, res) =>  {
   const nome = req.params.nome; 
   res.render("perfil" , {
    nome:nome
   });
}); 

//ROTA VIDEOS
app.get("/videos/:playlist?;",(req, res) =>  { 
  res.render("videos");
}); 

//ROTA DE PRODUTOS
app.get("/produtos/:produto?", (req,res) => {
  const listaProdutos = ['Computador','Celular','Tablet','Notebook']
  const produto = req.params.produto
  
  res.render("produtos",{
    //Enviando a variavel para a pagina
  //Sera chamado na pagina  
    produto : produto, //Variavel que esta na index (req.params)
    listaProdutos : listaProdutos
    // Na pagina produtos.ejs havera uma testagem de condição
  })
})
 
//iniciando o servidor na porta 8080
app.listen(8080, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log("Servidor iniciado com sucesso.");
  }
});
 