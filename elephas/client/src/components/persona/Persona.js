import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PersonaActions from './PersonaActions';
import PersonaHeader from './PersonaHeader';
import Spinner from '../common/Spinner';
import { getPersonaById, deletePersona } from '../../rActions/personaActions';

class Persona extends Component {
  componentDidMount () {
    if (this.props.match.params.id) {
      this.props.getPersonaById(this.props.match.params.id);
    }
  }

  onDeleteClick (e) {
    this.props.deletePersona(this.props.persona.persona, this.props.history);
  }

  render () {
    const { persona, loading } = this.props.persona;
    let personaContent, deletePersonaButton;

    if (persona === null || loading) {
      personaContent = <Spinner />
    } else {
      personaContent = (
        <div>
          <div className="row">
            <div className="container">
              <div className="col-md-12">
                <PersonaHeader persona={persona} />
              </div>
              <PersonaActions />
            </div>
          </div>
        </div>
      )
      deletePersonaButton = (
        <button
          onClick={ this.onDeleteClick.bind(this) }
          className="btn btn-light">
          <i className="fas fa-trash puce mr-1"></i>
          Excluir Persona
        </button>
      )
    }

    return (
      <div className="persona">
        { deletePersonaButton }
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              { personaContent }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Persona.propTypes = {
  persona: PropTypes.object.isRequired,
  getPersonaById: PropTypes.func.isRequired,
  deletePersona: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  persona: state.persona
})

export default connect(mapStateToProps, { getPersonaById, deletePersona })(Persona);
