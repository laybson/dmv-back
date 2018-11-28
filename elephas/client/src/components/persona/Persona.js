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
    console.log("Props",this.props)
    this.props.deletePersona(this.props.persona.persona, this.props.history);
  }

  render () {
    const { persona, loading } = this.props.persona;
    let personaContent;

    if (persona === null || loading) {
      personaContent = <Spinner />
    } else {
      personaContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/personas" className="btn btn-light mb-3 float-left">
                Back to Personas
              </Link>
              <button onClick={ this.onDeleteClick.bind(this) } className="btn btn-danger">Delete Persona</button>
            </div>
            <div className="col-md-6" />
            <PersonaHeader persona={persona} />
            <PersonaActions />
          </div>
        </div>
      )
    }

    return (
      <div className="persona">
        <div className="persona">
          <div className="persona">
            <div className="persona">
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
