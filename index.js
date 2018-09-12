const request = require('supertest');
const express = require('express');
const morgan = require('morgan');

const usuario = require('./api/usuario');
const deputado = require('./api/deputado');

const app = express();

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();  // sem o next, a chamada para aqui
});

//rotas
app.use("/api/usuario", usuario);
app.use("/api/deputado", deputado);

const porta = 3000;

// app.get('/', (req, res) => res.send('Hello World!'))

// app.get('/', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ a: 1 }))
// });

// app.use((req, res, next) => {
//     res.header('Content-Type', 'application/json');
//     next();  // sem o next, a chamada para aqui
// });


// app.get(usuario, (req, res) => {
//     res.send(JSON.stringify({value: 1}));
// });

app.get('/usuario', function(req, res) {
  res.status(200).json({ name: 'Laybson' });
});

app.listen(porta, () => console.log('Tou ouvindo ein... Na porta ${porta}'))

module.exports = app;
