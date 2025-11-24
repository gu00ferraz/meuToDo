import { Sequelize } from "sequelize";


// tabela filha (N)
export let meuTodo = null 
//async 
function initTodo2 (sequelize){
    meuTodo = sequelize.define('meuTodo', {
        // descricao 
        conteudoDasTarefas: {
            type: Sequelize.STRING,
            allowNull: false, 
        },

        //checkbox:
        estaConcluido: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        
        nomeDaLista: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "default value esta errado"
        }

    })

}

export default initTodo2;