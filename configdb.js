import openConnection from "./db.js";
import initTodo, { toDo } from "./ToDo.js";
import initTodo2, { meuTodo } from "./ToDo2.js";


// abriu o banco e sincronizou com a model 
export async function configDb (){
const sequelize = await openConnection()
// inicia as models 
initTodo(sequelize)
initTodo2(sequelize)


// um toDo pode ter muitos meuTodo
  toDo.hasMany(meuTodo);

  // cada meuTodo pertence a um toDo
  meuTodo.belongsTo(toDo);


// gera a tabela e sincroniza com o banco 
await sequelize.sync({alter : true,});
}




