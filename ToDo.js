import { Sequelize } from "sequelize";

// tabela pai (1)
export let toDo = null
// async
 function initTodo (sequelize){
 toDo = sequelize.define('todo', {
       //titulo da lista de tarefas 
       tituloDaLista: {
           type: Sequelize.STRING,
           allowNull: false,
       },
   })
  //await toDo.create({tituloDaLista: "qualaer", estaConcluido: true, conteudoDasTarefas: "conteudo" })

}

export default initTodo;
