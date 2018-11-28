import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import elephant from '../../img/elephant.jpg';
import { deletePersona } from '../../rActions/personaActions';
import { connect } from 'react-redux';

class PersonaItem extends Component {
  onDeleteClick (e) {
    this.props.deletePersona(this.props.persona, this.props.history);
  }

  render () {
    const { persona } = this.props;
    return (
      <div className="card card-body bg-light mb-3 container-fluid">
        <div className="row">
          <div className="col-2">
            <img src={ elephant } alt="" className="rounded-circle" />
          </div>
          <div className="col-10">
            <p>{ persona.name }</p>
            <div className="row">
              <div className="col-sm-6">Goodness:{' '}{ persona.gRating }</div>
              <div className="col-sm-6">Agreement:{' '}{ persona.cRating }</div>
            </div>
            <div>
              <Link to={ `/personas/${persona._id}` } className="btn btn-info pull-right">
                View Persona
              </Link>
              <button onClick={ this.onDeleteClick.bind(this) } className="btn btn-danger pull-right">Delete Persona</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PersonaItem.propTypes = {
  persona: PropTypes.object.isRequired,
  deletePersona: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  // persona: state.persona
})

export default connect(null, { deletePersona })(PersonaItem);
