import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export function loadActions() {
  return (dispatch) => {
    axios.get(`${url}actions`).then((res) => {
      let actions = res.data
      dispatch({type : 'LOAD_ACTIONS', actions})
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function loadPersonas() {
  return (dispatch) => {
    axios.get(`${url}personas`).then((res) => {
      let personas = res.data
      dispatch({type : 'LOAD_PERSONAS', personas})
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function getUser(id) {
  return axios.get(`${url}user/${id}`).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

export function getUserProfile(id) {
  return (dispatch) => {
    axios.get(`${url}user/profile/${id}`).then((res) => {
      let profile = res.data
      dispatch({type : 'SET_PROFILE', profile})
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function getAction(actionId) {
  return (dispatch) => {
    axios.get(`${url}action/${actionId}`).then((res) => {
      let action = res.data
      dispatch({type: 'VIEW_ACTION', action})
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function comment(id) {
  return (dispatch) => {
  }
}

export function rate(actionId) {
  return (dispatch) => {
    axios.get(`${url}action/rate`,{actionId}).then((res) => {
      dispatch({type : 'RATE_ACTION'})
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function addPersona(id, userId) {
  return (dispatch) => {
    axios.get(`${url}user/addPersona`,{id, userId}).then((res) => {
      dispatch({type : 'ADD_PERSONA', userId})
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function signInUser(userData) {
  return (dispatch) => {
    axios.get(`${url}user`, userData).then((res) => {
      let user = res.data
      localStorage.setItem('Auth', JSON.stringify(user))
      dispatch({type : 'SET_USER', user})
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function toggleClose() {
  return (dispatch) => {
    dispatch({type: 'TOGGLE_MODAL', modalMode : false})
  }
}

export function toggleOpen() {
  return (dispatch) => {
    dispatch({type: 'TOGGLE_MODAL', modalMode : true})
  }
}
