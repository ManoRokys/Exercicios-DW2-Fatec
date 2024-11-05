import express from "express";
const router = express.Router();
import User from "../models/User.js";
// Importando o bcrypt
import bcrypt from "bcrypt";
import Auth from "../middleware/Auth.js";


// ROTA DE LOGIN
router.get("/login", (req,res) => {
    res.render("login", {
        loggedOut: true,
        messages: req.flash()
    });
});
// ROTA DE LOGOUT
router.get("/logout", (req,res) => {
    req.session.user = undefined;
    req.flash('success', "Usuário deslogado com sucesso!")
    res.redirect("/");
})

// ROTA DE CADASTRO
router.get("/cadastro", (req,res) => {
    res.render("cadastro", {
        loggedOut: true,
        messages: req.flash()
    });
});

// ROTA DE CRICAO DE USUARIO
router.post("/createUser", (req,res) => {
    const email = req.body.email
    const password = req.body.password
    // VERIFICA SE O USUARIO JA ESTA CADASTRADO
    User.findOne({
        where: {email:email} }).then((user) => {
        // SE NAO HOUVER
        if (user == undefined){
            // AQUI É FEITO O CADASTRO E O HASH DA SENHA
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            User.create({
                email: email,
                password: hash,
            }).then(()=>{
                res.redirect("/login")
            })
        // CASO O USUARIO JA ESTEJA CADASTRADO
        }   else {
            req.flash('danger', "O usuario já está cadastrado. Faça o login")
            res.redirect("/cadastro")
        }
    })  
})

// ROTA DE AUTENTICACAO
router.post("/authenticate", (req, res) =>{
    const email = req.body.email
    const password = req.body.password
    // BUSCA O USUARIO NO BANCO
    User.findOne({
        where: {
            email: email,
        },
    }).then((user) => {
        // SE O USUARIO ESTIVER CADASTRADO
        if (user != undefined){
            // VALIDA A SENHA (VERIFICA O HASH)
            const correct = bcrypt.compareSync(password, user.password)
            // SE A SENHA FOR VALIDA 
            if (correct) {
                // AUTORIZA O LOGIN
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
              // res.send(`Usuario logado:<br>
              // ID ${req.session.user['id']}<br>
              // E-mail: ${req.session.user['email']}`)
              // Enviar uma mensagem de sucesso
              req.flash('success',"Login efetuado com sucesso!")
                res.redirect("/");

            } 
            // SE A SENHA NAO FOR VALIDA
            else {
                req.flash('danger', "A Senha informada está incorreta! tente novamente.")
                res.redirect("/login")
            }
        }
        else {
        // SE O USUARIO NÃO EXISTE
        req.flash('danger', "O usuário informado não existe! Verifique os dados digitados.")
        res.redirect("/login")
        }
    })
})

export default router;