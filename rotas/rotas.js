import { Router } from "express";
import { toDo } from "../ToDo.js"
import { meuTodo } from "../ToDo2.js"

// objeto rotas, onde elas serao registradas
const rotas = Router();

// =========================
// CRUD DA TABELA PAI (LISTAS)
// =========================

// criar a lista 
rotas.post("/listas", async (req, res) => {
    const { tituloDaLista } = req.body;

    try {
        const novaLista = await toDo.create({ tituloDaLista });
        res.json(novaLista);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar lista" });
    }
});

// ler a lista 
rotas.get("/listas", async (req, res) => {
    try {
        const listas = await toDo.findAll();
        res.json(listas);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar listas" });
    }
});

// update lista
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


// =========================
// CRUD DA TABELA FILHO (TAREFAS)
// =========================

// criar tarefa vinculada a uma lista
rotas.post("/listas/:id/tarefas", async (req, res) => {
    try {
        const listaId = req.params.id;

        // 🚨 Agora incluindo nomeDaLista
        const { conteudoDasTarefas, estaConcluido, nomeDaLista } = req.body;

        const nova = await meuTodo.create({
            conteudoDasTarefas,
            estaConcluido,
            nomeDaLista,   // <-- AGORA SALVA NO BANCO
            lista_id: listaId
        });

        res.json(nova);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar tarefa", detalhe: error });
    }
});

// listar tarefas de uma lista
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

// atualizar tarefa
rotas.put("/tarefas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { conteudoDasTarefas, estaConcluido, nomeDaLista } = req.body;

        const tarefa = await meuTodo.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }

        tarefa.conteudoDasTarefas = conteudoDasTarefas;
        tarefa.estaConcluido = estaConcluido;

        // opcional: permitir editar o nomeDaLista
        if (nomeDaLista !== undefined) {
            tarefa.nomeDaLista = nomeDaLista;
        }

        await tarefa.save();

        res.json(tarefa);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar a tarefa", detalhe: error });
    }
});

// deletar tarefa
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
