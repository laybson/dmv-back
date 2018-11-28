import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PersonaActionItem from './PersonaActionItem';

class PersonaActionFeed extends Component {
  render () {
    const { actions } = this.props;

    return actions.map(action => <PersonaActionItem key={action._id} action={action}/>)
  }
}

PersonaActionFeed.propTypes = {
  actions: PropTypes.array.isRequired
}

export default PersonaActionFeed;
