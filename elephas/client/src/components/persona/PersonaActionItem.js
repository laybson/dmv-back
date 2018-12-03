import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteAction } from '../../rActions/actionActions';
import { updateRatings } from '../../rActions/personaActions';

class PersonaActionItem extends Component{
  onDeleteClick (action) {
    const { persona } = this.props;
    this.props.deleteAction(action);
    this.props.updateRatings(persona.persona._id);
  }

  render () {
    const { action, auth } = this.props;

    return (
      <div>
        <div className="card card-body">
          <div className="row">
            <div className="col-md-12">
              <p className="lead text">{ action.text }</p>
              <div className="row">
                <div className="col-sm-4 text-muted">
                  <i class="fas fa-yin-yang"></i>{' '}
                  Bondade:{' '}{ action.gRating }</div>
                <div className="col-sm-4 text-muted">
                  <i class="fas fa-magnet"></i>{' '}
                  Sintonia:{' '}{ action.cRating }</div>
                <div className="col-sm-4 text-muted">
                  <button
                    onClick={ this.onDeleteClick.bind(this, action) }
                    className="btn btn-light text-muted">
                    <i className="fas fa-trash puce"></i>{' '}
                    Excluir Ação
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PersonaActionItem.propTypes = {
  auth: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired,
  deleteAction: PropTypes.func.isRequired,
  updateRatings: PropTypes.func.isRequired,
  persona: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  persona: state.persona
})

export default connect(mapStateToProps, { deleteAction, updateRatings })(PersonaActionItem);
