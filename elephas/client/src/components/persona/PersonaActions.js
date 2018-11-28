import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PersonaActionsForm from './PersonaActionsForm';
import PersonaActionFeed from './PersonaActionFeed';
import Spinner from '../common/Spinner';
import { getPersonaActions } from '../../rActions/actionActions';

class PersonaActions extends Component {
  componentDidMount() {
    this.props.getPersonaActions(this.props.persona.persona._id)
  }
  render () {
    const { actions, loading } = this.props.action;
    let actionContent;

    if (actions === null || loading) {
      actionContent = <Spinner />
    } else {
      actionContent = <PersonaActionFeed actions={actions} />
    }
    return (
      <div className="actions">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PersonaActionsForm />
              { actionContent }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PersonaActions.propTypes = {
  errors: PropTypes.object.isRequired,
  getPersonaActions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  persona: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  persona: state.persona,
  action: state.action
})

export default connect(mapStateToProps, { getPersonaActions })(PersonaActions);
