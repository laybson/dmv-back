const Usuario = require('./Usuario');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.listaUsuarios = (req, res) => {
    Usuario.find((err, usuario) => {
        if (err) {
            res.send(err);
        }
        res.json(usuario);
    });
};

exports.cadastrarUsuario = (req, res) => {
    const key = req.body.cpf + req.body.senha;
    bcrypt.hash(key, saltRounds).then((hash) => {
        req.body.senha = hash;
        const novoUsuario = new Usuario(req.body);
        novoUsuario.save((err, usuario) => {
            if (err) {
                res.send(err);
            }
            res.json(usuario);
        });
    });
};

exports.getUsuario = (req, res) => {
    Usuario.findOne({
        cpf : req.params.cpf
    }, (err, usuario) => {
        if (err) {
            res.send(err);
        }
        res.json(usuario);
    });
};

exports.atualizarUsuario = (req, res) => {
    Usuario.findOneAndUpdate({
        cpf: req.params.cpf
    }, req.body, {new: true}, (err, usuario) => {
        if (err) {
            res.send(err);
        }
        res.json(usuario);
    });
};

exports.removerUsuario = (req, res) => {
    Usuario.remove({
        cpf: req.params.cpf
    }, (err, usuario) => {
        if (err) {
            res.send(err);
        }
        res.json({ mensagemSucesso: 'Usuario removido.'});
    });
};
