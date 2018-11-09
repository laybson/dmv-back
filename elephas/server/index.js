const user = require('./user/user')
const action = require('./action/action')
const persona = require('./persona/persona')

module.exports = (router) => {
  // user(router)
  action(router)
  // persona(router)
}
