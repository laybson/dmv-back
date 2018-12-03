import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { addAction } from '../../rActions/actionActions';
import { updateRatings } from '../../rActions/personaActions';

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
    this.props.addAction(actionData)
    this.props.updateRatings(persona.persona._id);
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
      <div className="new-action-card">
        <div className="new-action-title text-white">
          Nova Ação
        </div>
        <form onSubmit={ this.onSubmit }>
          <div className="row">
            <div className="col-md-12">
              <TextAreaFieldGroup
                placeholder="O que houve?"
                name="text"
                value={ this.state.text }
                onChange={ this.onChange }
                error={ errors.text }
              />
              <div className="row">
                <div className="col-sm-4">
                  <InputGroup
                    placeholder="Bondade"
                    icon="fas fa-yin-yang"
                    name="gRating"
                    type="number"
                    value={ this.state.gRating }
                    onChange={ this.onChange }
                    error={ errors.text }
                  />
                </div>
                <div className="col-sm-4">
                  <InputGroup
                    placeholder="Sintonia"
                    icon="fas fa-magnet"
                    name="cRating"
                    type="number"
                    value={ this.state.cRating }
                    onChange={ this.onChange }
                    error={ errors.text }
                  />
                </div>
                <div className="col-sm-4">
                  <button type="submit" className="btn btn-lg btn-block grey-blue back-indigo">
                    Cadastrar Ação
                  </button>
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
  updateRatings: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  persona: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  persona: state.persona
})

export default connect(mapStateToProps,{ addAction, updateRatings })(PersonaActionsForm);
