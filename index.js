const request = require('supertest');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cache = require('memory-cache');

const usuario = require('./src/usuario/usuarioRoutes');
const deputado = require('./src/deputado/deputadoRoutes');
const swagger = require('./docs/docRoutes');

const app = express();
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const porta = 3000;

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
  res.status(200).json({ cpf: '00011112399' });
});

app.get('/deputado/:idDeputado', (req, res) => res.send("Deputado Fulano"))

app.listen(porta, () => console.log('Tou ouvindo ein... Na porta ${porta}'))

module.exports = app;
