import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connection } from './database/database.js';
const App = express();
const PORT = 3000;

// informa ao sistema que ira utilizar entradas do tipo json
App.use(express.json());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(cors());

//rota principal da aplicação
App.get('/', (req, resp) => {
  const query = 'SELECT COUNT(*) as total FROM produtos';
  connection.query(query, (err, data) => {
    if (err) return resp.status(404).json(error);

    return resp.status(200).json(data);
  });
});

//pega todos os produtos do banco
App.get('/produtos', (req, resp) => {
  const query = 'SELECT *  FROM produtos';

  connection.query(query, (err, data) => {
    if (err) return resp.status(404).json(error);

    return resp.status(200).json(data);
  });
});

App.get('/produtos/:id', (req, resp) => {
  const query = 'SELECT * FROM produtos WHERE codigoProduto = (?)';
  const codigoProduto = req.params.id;
  connection.query(query, [codigoProduto], (err, data) => {
    if (err) return resp.status(404).send(err);

    return resp.status(200).json(data);
  });
});

// inseri produtos no banco
App.post('/produtos', (req, resp) => {
  const data = req.body;
  const query =
    'INSERT INTO produtos (codigoProduto,nome,descrisao,preco) values (?)';
  const values = [data.codigoProduto, data.nome, data.descrisao, data.preco];

  connection.query(query, [values], (err, data) => {
    if (err) return resp.status(404).send(err);

    return resp.status(201).json(data);
  });
});

// rota de atualização
App.put('/produtos/:id', (req, resp) => {
  const codigoProduto = req.params.id;
  const data = req.body;

  const query =
    'UPDATE produtos SET `codigoProduto` = ?,`nome` = ?,`descrisao` = ?,`preco` = ? WHERE codigoProduto =  ? ';
  const values = [data.codigoProduto, data.nome, data.descrisao, data.preco];
  connection.query(query, [...values, codigoProduto], (err, data) => {
    if (err) return resp.status(404).json(err);
    return resp.status(200).json(data);
  });
});

// rota de deletar
App.delete('/produtos/:id', (req, resp) => {
  const produtoCodigo = req.params.id;
  console.log(produtoCodigo);
  const query = 'DELETE FROM produtos WHERE codigoProduto = ?';

  connection.query(query, [produtoCodigo], (err, data) => {
    if (err) return resp.status(404).send(err);
    return resp.status(200).json(data);
  });
});

//sobe o sitema na porta 3000
App.listen(PORT, () => {
  console.log(`A aplicação esta rodando na porta ${PORT}`);
});
