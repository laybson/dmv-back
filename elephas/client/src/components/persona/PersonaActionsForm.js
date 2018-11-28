import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { addAction } from '../../rActions/actionActions';

class PersonaActionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      cRating: '',
      gRating: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const { persona } = this.props;
    const actionData = {
      text: this.state.text,
      cRating: this.state.cRating,
      gRating: this.state.gRating,
      persona: persona.persona._id
    }
    console.log("ACTION",actionData)
    this.props.addAction(actionData);
    this.setState({
      text: '',
      cRating: '',
      gRating: '' })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  render () {
    const { errors } = this.state;
    return (
      <div className="card card-body mb-3">
        <div className="card-header bg-card text-white">
          New Action
        </div>
        <form onSubmit={ this.onSubmit }>
          <div className="row">
            <div className="col-md-12">
              <TextAreaFieldGroup
                placeholder="What's done?"
                name="text"
                value={ this.state.text }
                onChange={ this.onChange }
                error={ errors.text }
              />
              <div className="row">
                <div className="col-sm-4">
                  <InputGroup
                    placeholder="Goodness"
                    name="gRating"
                    type="Number"
                    value={ this.state.gRating }
                    onChange={ this.onChange }
                    error={ errors.text }
                  />
                </div>
                <div className="col-sm-4">
                  <InputGroup
                    placeholder="Agreement"
                    name="cRating"
                    type="Number"
                    value={ this.state.cRating }
                    onChange={ this.onChange }
                    error={ errors.text }
                  />
                </div>
                <div className="col-sm-4">
                  <button type="submit" className="btn btn-dark">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

PersonaActionsForm.propTypes = {
  errors: PropTypes.object.isRequired,
  addAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  persona: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  persona: state.persona
})

export default connect(mapStateToProps,{ addAction })(PersonaActionsForm);
