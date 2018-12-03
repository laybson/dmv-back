import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PersonaItem from './PersonaItem';
import { getPersonas } from '../../rActions/personaActions';
import { Link } from 'react-router-dom';

class Personas extends Component {
  componentDidMount () {
    const { isAuthenticated, user } = this.props.auth;
    this.props.getPersonas(user);
  }
  render () {
    const { personas, loading } = this.props.persona;
    let personasItems;

    if (personas === null || loading) {
      personasItems = <Spinner />
    } else {
      if (personas.length > 0) {
        personasItems = personas.map(persona => (
          <PersonaItem key={ persona._id } persona={ persona }/>
        ))
      } else {
        personasItems = <p className="lead text-muted text-center">Crie suas Personas</p>
      }
    }
    return (
      <div className="personas">
        <Link to="/create-persona" className="btn btn-light">
          <i className="fas fa-user indigo mr-1"></i> Criar Persona
        </Link>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              { personasItems }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Personas.propTypes = {
  getPersonas: PropTypes.func.isRequired,
  persona: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  persona: state.persona,
  auth: state.auth
});


export default connect(mapStateToProps, { getPersonas })(Personas);
