const Deputado = require('./Deputado');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getDeputado = (req, res) => {
    Deputado.findById(req.params.idDeputado, (err, deputado) => {
        if (err) {
            res.send(err);
        }
        res.json(deputado);
    });
};

exports.criarDeputado = (req, res) => {
    const novoDeputado = new Deputado(req.body);
    novoDeputado.save((err, deputado) => {
        if (err) {
            res.send(err);
        }
        res.json(deputado);
    });
};

exports.atualizarDeputado = (req, res) => {
    Deputado.findOneAndUpdate({_id: req.params.idDeputado}, req.body, {new: true}, (err, deputado) => {
        if (err) {
            res.send(err);
        }
        res.json(deputado);
    });
};

exports.listaDeputados = (req, res) => {
    Deputado.find((err, deputado) => {
        if (err) {
            res.send(err);
        }
        res.json(deputado);
    });
};

exports.removerDeputado = (req, res) => {
    Deputado.remove({
        _id: req.params.idDeputado
    }, (err, deputado) => {
        if (err) {
            res.send(err);
        }
        res.json({ mensagemSucesso: 'Deputado removido'});
    });
};
