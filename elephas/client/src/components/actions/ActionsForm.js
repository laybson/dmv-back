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
      <div>

      </div>
    )
  }
}

export default ActionsForm;
