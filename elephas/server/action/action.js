const actionCtrl = require('./action.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {

  router.route('/actions')
    .get(actionCtrl.getAll)

  router.route('/action')
    .post(multipartWare, actionCtrl.addAction)

  router.route('/action/comment')
    .post(actionCtrl.commentAction)

  router.route('/action/:id')
    .get(actionCtrl.getAction)
}
