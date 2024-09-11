//Importar o Express pra nossa aplicação
// npx (executar pacotes)
// npm start (abreviação do npx nodemon index.js que roda o projeto)
const express = require("express"); //CommonJS Modules
//criando uma instância do express
const app = express();
 
//criando a rota principal
app.get("/", (req, res) => {
  res.send("<h1>Hello world!hihi</h1><br><hr>");
});
 
//ROTA PERFIL
//: dois pontos representa entrada de parametro
//:nome é um parâmetro obrigatório
//:nome? é um parâmetro opcional
app.get("/perfil/:nome?", (req, res) => {
  //coletando o parâmetro e guardando na variável
  const nome = req.params.nome;
  //verificando se o parâmetro nome existe
  if (nome) {
    //se o nome = true
    res.send(`Olá ${nome}! Seja bem-vindo!`);
  } else {
    res.send(`<h2>Faça login para acessar o seu perfil</h2>`);
  }
  res.send(`<h1>Olá ${nome}!</h1>`);
});
 
//ROTA DE VÍDEO
app.get("/videos/:playlist?/:video?", (req, res) => {
    const playlist = req.params.playlist
    const video = req.params.video

    if (playlist &&  video == undefined){
        res.send(`<h2>Você está na playlist de ${playlist}.</h2>`)
    }

    if (playlist && video){
        res.send(`<h2>Você está na playlist de ${playlist}</h2><br> Reproduzindo o video ${video}...`)
    }
    else{
        res.send("<h1>Página de vídeos</h1>");
    } 
});
 
//iniciando o servidor na porta 8080
app.listen(8080, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log("Servidor iniciado com sucesso.");
  }
});
 