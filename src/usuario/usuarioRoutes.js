module.exports = (app) => {
    const usuarioCtrl = require('./usuarioController');

    app.route('/usuario')
        .get(usuarioCtrl.listaUsuarios)
        .post(usuarioCtrl.cadastrarUsuario);
    app.route('/usuario/:cpf')
        .get(usuarioCtrl.getUsuario)
        .put(usuarioCtrl.atualizarUsuario)
        .delete(usuarioCtrl.removerUsuario);
};
