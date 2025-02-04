const express = require('express');
const db = require('../db.js');

const router = express.Router();

//http://localhost:3050/api/produtos
router.get("/", async (req, res) => {
    const queryLista = "SELECT * FROM lista_compras ORDER BY produto";

    try {
        const [result] = await db.query(queryLista);
        if (result.length === 0) {
            return res.status(404).send({ message: "Nada encontrado" });
        }
        res.status(200).send(result)
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        res.status(500).send({ message: "Erro interno no servidor" });
    }
});

//1'
router.post("/cadastro", async (req, res) => {
    const { produto, qtde } = req.body;

    // Verifica se os dados foram enviados corretamente
    if (!produto || !qtde) {
        return res.status(400).send({ message: "Dados inválidos, forneça produto e quantidade." });
    }

    const queryInsert = "INSERT INTO lista_compras (produto, qtde, comprado) VALUES (?, ?, ?)";

    try {
        // Usando async/await para inserir no banco
        const [result] = await db.query(queryInsert, [produto, qtde, 0]);

        // Envia resposta de sucesso
        res.status(201).send({ message: "Produto cadastrado com sucesso.", id: result.insertId });
    } catch (err) {
        console.error('Erro ao cadastrar produto:', err);
        res.status(500).send({ message: "Erro interno ao cadastrar o produto." });
    }
});


//http://localhost:3050/api/produtos/ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;  // Pega o id do produto a ser atualizado pela URL
    const { produto, qtde, comprado } = req.body;  // Pega os dados do produto e quantidade do corpo da requisição

    // Verifica se os dados foram fornecidos
    if (!produto || !qtde || comprado === undefined) {
        return res.status(400).send({ message: "Dados inválidos, forneça produto e quantidade." });
    }

   
    const queryUpdate = "UPDATE lista_compras SET produto = ?, qtde = ?, comprado = ? WHERE id = ?";

    try {
       
        const [result] = await db.query(queryUpdate, [produto, qtde,comprado, id]);

        // Verifica se o produto foi encontrado e atualizado
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Produto não encontrado." });
        }

        // Envia resposta de sucesso
        res.status(200).send({ message: "Produto atualizado com sucesso." });
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).send({ message: "Erro interno ao atualizar o produto." });
    }
});
module.exports = router;