import { Sequelize } from "sequelize";

// configuraçoes para a conexao com o banco de dados

// testando a conexao com o banco de dados:


async function openConnection (){
    //'database', 'username', 'password'
    const sequelize = new Sequelize('postgres', 'gustavo', 'senhasecreta', {
    dialect: 'postgres',
    host: 'localhost',

});
try {
    await sequelize.authenticate();
    console.log('ok')
} catch (error) {
    console.log('nao deu certo', error)
}
return sequelize
    


}
export default openConnection