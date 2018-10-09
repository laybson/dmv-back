module.exports = (app) => {
    const usuarioCtrl = require('./usuarioController');
    // const auth = require('../autenticacao/authController');
    // const authenticate = auth.authenticate;
    // const authorizeByUsername = auth.authorizeByUsername;

    app.route('/usuario')
        .get(/*authenticate,*/ usuarioCtrl.listaUsuarios)
        .post(usuarioCtrl.cadastrarUsuario);
    app.route('/usuario/:cpf')
        .get(/*authenticate,*/ usuarioCtrl.getUsuario)
        .put(/*authenticate, authorizeByUsername,*/ usuarioCtrl.atualizarUsuario)
        .delete(/*authenticate, authorizeByUsername,*/ usuarioCtrl.removerUsuario);
};
