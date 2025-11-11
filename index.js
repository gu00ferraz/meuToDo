
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

configDb()
// configurar o express 