const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const porta = 3000;
const app = express();

// Configurar JSON Server
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(express.json()); // Para parsear JSON no corpo das requisições
app.use('/api', router); // Rota para a API JSON Server

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal redireciona para index
app.get('/', (req, res) => {
    res.redirect('/index');
});

// Rotas para cada página
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

app.get('/atualizar', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'atualizar.html'));
});

app.get('/excluir', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'excluir.html'));
});

// Rota de erro 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Inicia o servidor
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
    console.log(`API JSON Server disponível em http://localhost:${porta}/api/pessoas`);
});