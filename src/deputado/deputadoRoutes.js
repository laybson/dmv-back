module.exports = (app) => {
    const deputadoCtrl = require('./deputadoController');

    app.route('/deputado')
        .get(deputadoCtrl.listaDeputados)
        .post(deputadoCtrl.criarDeputado);

    app.route('/deputado/:idDeputado')
        .get(deputadoCtrl.getDeputado)
        .put(deputadoCtrl.atualizarDeputado)
        .delete(deputadoCtrl.removerDeputado);
};
