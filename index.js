
import {configDb} from "./configdb.js"

/* // abriu o banco e sincronizou com a model 
(async () => {
const sequelize = await openConnection()
initTodo(sequelize)
// gera a tabela
await sequelize.sync({generate : true,});
// force:  true PARA quando iniciar uma nova tabela (jeito nao profissional)


/* create
    const novaTarefa = await Produto.create({
        nome: "comprar pao "
    })
    console.log(novaTarefa)

// read
    const listas = await Produto.findAll();
    console.log(listas)

// update
    Produto.descricao = "fiz uma alteracao";
    await Produto.save();

// delete
    await produto.destroy();

})(); */

// configurar o express 

import express from 'express'
const app = express()
const port = 3000


// GET - CREATE 
app.get('/', (req, res) => {
    
    res.send('Hello World, Gustavo!')
})

// POST - READ


// PUT - UPDATE 

// DELETE - DELETE 



app.listen(port, () => {
    console.log(`EXEMPLO RODANDO NA PORTA: ${port}`)
    configDb()

})
