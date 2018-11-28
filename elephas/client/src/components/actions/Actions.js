import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActionsForm from './ActionsForm';
import Spinner from '../common/Spinner';

class Actions extends Component {
  render () {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ActionsForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Actions;
