import express from 'express' // ES6 MODULES
const router = express.Router()

// ROTA DE CLIENTES
router.get("/clientes", (req, res) => {
    const clientes = [
        {nome: "Ana Silva", cpf: "123.456.789-10", endereco: "Rua das Flores, 123 - Bairro Jardim Primavera - Felicidade - SP"},
        {nome: "Ana Silva", cpf: "123.456.789-10", endereco: "Rua das Flores, 123 - Bairro Jardim Primavera - Felicidade - SP"},
        {nome: "Ana Silva", cpf: "123.456.789-10", endereco: "Rua das Flores, 123 - Bairro Jardim Primavera - Felicidade - SP"},
        {nome: "Ana Silva", cpf: "123.456.789-10", endereco: "Rua das Flores, 123 - Bairro Jardim Primavera - Felicidade - SP"}
    ]
    res.render("clientes", {
        clientes : clientes
    })
})
export default router 