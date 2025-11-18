import { Router } from "express";
import { toDo } from "../ToDo.js"
import { meuTodo } from "../ToDo2.js"

// objeto rotas, onde elas serao registradas
const rotas = Router();

// aqui tera as rotas

// cr da tabela pai 

// criar a lista 
rotas.post("/listas", async (req, res) => {
    const { tituloDaLista } = req.body;
    // try catch para evitar que o servidor quebre  
    try {
        // cria um novo registro na tabela lista 
        const novaLista = await toDo.create({ tituloDaLista });
        res.json(novaLista);
    } catch (error) {
        // ira responder um erro 500 se o banco quebrar 
        res.status(500).json({ erro: "Erro ao criar lista" });
    }
});

// ler a lista 
rotas.get("/listas", async (req, res) => {
    // req é o pedido,  res é a resposta 
    // garante que se der erro no banco, o servidor nao quebra 
    try {
        const listas = await toDo.findAll();
        // findAll busca todos os registros e retorna um array 
        // resposta da api 
        res.json(listas);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar listas" });
    }
});
// implementar update 
rotas.put("/listas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { tituloDaLista } = req.body;
        const lista = await toDo.findByPk(id);
        if (!lista) {
            return res.status(404).json({ erro: "Lista não encontrada" });
        }
        lista.tituloDaLista = tituloDaLista;
        await lista.save();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar a lista" });
    }
});

// crud da tabela filho 

// post (cria a tarefa)
rotas.post("/listas/:id/tarefas", async (req, res) => {
    try {
        const listaId = req.params.id;
        const { conteudoDasTarefas, estaConcluido } = req.body;
        const nova = await meuTodo.create({
            conteudoDasTarefas,
            estaConcluido,
            lista_id: listaId
        });

        res.json(nova);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar tarefa" });
    }
});

// get (listar tarefas)
// Ler todas as tarefas de uma lista
rotas.get("/listas/:id/tarefas", async (req, res) => {
    try {
        const listaId = req.params.id;
        const tarefas = await meuTodo.findAll({
            where: { lista_id: listaId }
        });
        res.json(tarefas);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar tarefas", detalhe: error });
    }
});

// put (atualiza a tarefa)
rotas.put("/tarefas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { conteudoDasTarefas, estaConcluido } = req.body;
        // busca a tarefa
        const tarefa = await meuTodo.findByPk(id);
        if (!tarefa) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }

        // atualiza a tarefa
        tarefa.conteudoDasTarefas = conteudoDasTarefas;
        tarefa.estaConcluido = estaConcluido;
        await tarefa.save();
        res.json(tarefa);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar a tarefa", detalhe: error });
    }
});

// delete (deleta a tarefa)
rotas.delete("/tarefas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const tarefa = await meuTodo.findByPk(id);
        if (!tarefa) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }
        await tarefa.destroy();
        res.json({ mensagem: "Tarefa deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar a tarefa", detalhe: error });
    }
});



export default rotas;