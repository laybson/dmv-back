import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteAction } from '../../rActions/actionActions';

class PersonaActionItem extends Component{
  onDeleteClick (action) {
    this.props.deleteAction(action)
  }
  render () {
    const { action, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-12">
            <p className="text">{ action.text }</p>
            <div className="row">
              <div className="col-sm-4">Goodness:{' '}{ action.gRating }</div>
              <div className="col-sm-4">Agreement:{' '}{ action.cRating }</div>
              <div className="col-sm-4">
                <button onClick={this.onDeleteClick.bind(this, action)} className="btn btn-danger mr-1" type="button">
                  <i className="fas fa-times" />
                </button>
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
  deleteAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteAction })(PersonaActionItem);
