import { Sequelize } from "sequelize";


export let toDo = null
function initTodo (sequelize){
 toDo = sequelize.define('todo', {
       id: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           allowNull: false,
           primaryKey: true
       },

       //titulo da lista de tarefas 
       tituloDaLista: {
           type: Sequelize.STRING,
           allowNull: false,
       },
        // checkbox concluido 
        estaConcluido: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },


        // descricao 
        conteudoDasTarefas: {
            type: Sequelize.STRING,
            allowNull: false, 
        },
        


   })

}

export default  initTodo;