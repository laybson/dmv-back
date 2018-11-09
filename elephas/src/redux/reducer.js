import { combineReducers } from 'redux'
import actions from './reducers/actions'
import personas from './reducers/personas'
import authUser from './reducers/authUser'
import common from './reducers/common'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  actions,
  personas,
  authUser,
  common,
  router: routerReducer
})
