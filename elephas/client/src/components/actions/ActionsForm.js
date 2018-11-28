import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addAction } from '../../rActions/actionActions';

class ActionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      cRating: '',
      gRating: '',
      errors: {}
    }
  }
  render () {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            action
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <textarea className="form-control form-control-lg" placeholder="What's done?"></textarea>
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ActionsForm;
