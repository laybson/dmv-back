const request = require('supertest');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cache = require('memory-cache');

const usuario = require('./src/usuario/usuarioRoutes');
const deputado = require('./src/deputado/deputadoRoutes');
const swagger = require('./docs/docRoutes');

const app = express();

const porta = 3000;

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Deputadobd', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(cors());

usuario(app);
deputado(app);
swagger(app);

app.get('/', (req, res) => res.send("DEVOLVA MEU VOTO!"))

app.get('/usuario', function(req, res) {
  res.status(200).json({ name: 'Laybson' });
});

app.get('/deputado/:idDeputado', (req, res) => res.send("Deputado Fulano"))

app.listen(porta, () => console.log('Tou ouvindo ein... Na porta ${porta}'))

module.exports = app;
