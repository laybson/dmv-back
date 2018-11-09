import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Feed from './components/Feed'
import Profile from './components/Profile'
import ActionView from './components/ActionView'
import PersonaView from './components/PersonaView'
import SignInWith from './components/SignInWith'
import requireAuthentication from './utils/requireAuth'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    const pathname = window.location.pathname
    return (
      <div>
      { !pathname.includes('editor') ? <Header /> : '' }
      <SignInWith />
        <Switch>
          <Route exact path="/" component={requireAuthentication(Feed)} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/actionview/:id" component={requireAuthentication(ActionView)} />
          <Route path="/personaview/:id" component={requireAuthentication(PersonaView)} />
          <Route path="**" component={requireAuthentication(Feed)} />
        </Switch>
      </div>
    )
  }
}

export default App
