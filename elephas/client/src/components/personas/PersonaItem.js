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
      <Link to={`/personas/${persona._id}`} className="no-hover">
        <div className="persona-card container indigo-hover">
          <div className="col-md-12">
            <div className="row">
              <div className="col-2">
                <img
                  src={ elephant } alt=""
                  className="rounded-circle"
                  style={{ maxHeight: '72px', maxWidth: '72px'}}/>
              </div>
              <div className="col-10">
                <p className="lead">{ persona.name }</p>
                <div className="row">
                  <div className="col-sm-6">
                    <i class="fas fa-yin-yang"></i>{' '}
                    Bondade:{' '}{ persona.gRating }</div>
                  <div className="col-sm-6">
                    <i class="fas fa-magnet"></i>{' '}
                    Sintonia:{' '}{ persona.cRating }</div>
                </div>
                {/*<div>
                  <button onClick={ this.onDeleteClick.bind(this) }
                  className="btn btn-danger pull-right">Delete Persona</button>
                </div>*/}
              </div>
            </div>
          </div>
        </div>
      </Link>
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
