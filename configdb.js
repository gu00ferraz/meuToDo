import openConnection from "./db.js";
import initTodo from "./ToDo.js";

// abriu o banco e sincronizou com a model 
export async function configDb (){
const sequelize = await openConnection()
initTodo(sequelize)

// gera a tabela
await sequelize.sync({generate : true,});
}


