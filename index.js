
import {configDb} from "./configdb.js"
import express from 'express'
import cors from "cors"

const app = express()
app.use(cors());
const port = 3000

/*
//   TESTE
app.get('/', (req, res) => {
    
    res.send('Hello World, Gustavo!')
})
*/

// CONFIGURANDO O PAI 

// CRIAR TITULO DA TABELA  - POST 
app.post("/todos", async (req, res) => {
  const { titulo } = req.body;
  const novo = await Todo.create({ titulo });
  res.json(novo);
});

// LER TITULO DA TABELA - GET 
app.get("/todos", async (req, res) => {
  const lista = await Todo.findAll();
  res.json(lista);
}); 

// CONFIGURANDO O FILHO 

// CRIAR CONTEUDO DA LISTA - POST 
app.post("/todos", async (req, res) => {
  const { conteudo } = req.body;
  const novo = await Todo.create({ conteudo });
  res.json(novo);
});

// LER CONTEUDO DA LISTA - GET 
app.get("/conteudo", async (req, res) => {
  const lista = await Todo.findAll();
  res.json(lista);
}); 

// ATUALIZAR CONTEUDO DA LISTA - PUT 
app.put("/conteudo/:id", async (req, res) => {
  const { id } = req.params;
  const { conteudo} = req.body;
  const item = await Todo.findByPk(id);

  item.titulo = titulo;
  item.descricao = descricao;

  await item.save();
  res.json(item);
});

// DELETAR LISTA - DELETE 
app.delete("/conteudo/:id", async (req, res) => {
  const id = req.params.id;
  await Todo.destroy({ where: { id } });
  res.json({ mensagem: "Removido com sucesso!" });
});

// INICIAR O SERVIDOR 
app.listen(port, () => {
    console.log(`EXEMPLO RODANDO NA PORTA: ${port}`)
    configDb()

})
