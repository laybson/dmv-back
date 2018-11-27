import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createPersona, getCurrentPersona } from '../../rActions/personaActions';
import isEmpty from '../../validation/is-empty';

class EditPersona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      name: '',
      cRating: 0,
      gRating: 0,
      email: '',
      twitter: '',
      instagram: '',
      facebook: '',
      youtube: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentPersona();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const persona = nextProps.persona.persona;

      persona.name = !isEmpty(persona.name) ? persona.name : '';
      persona.social = !isEmpty(persona.social) ? persona.social : {};
      persona.twitter = !isEmpty(persona.social.twitter) ? persona.social.twitter : '';
      persona.instagram = !isEmpty(persona.social.instagram) ? persona.social.instagram : '';
      persona.facebook = !isEmpty(persona.social.facebook) ? persona.social.facebook : '';
      persona.youtube = !isEmpty(persona.social.youtube) ? persona.social.youtube : '';
      persona.email = !isEmpty(persona.social.email) ? persona.social.email : '';

      this.setState({
        name: persona.name,
        cRating: persona.cRating,
        gRating: persona.gRating,
        email: persona.email,
        twitter: persona.twitter,
        instagram: persona.instagram,
        facebook: persona.facebook,
        youtube: persona.youtube
      })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const personaData = {
      name: this.state.name,
      cRating: this.state.cRating,
      gRating: this.state.gRating,
      email: this.state.email,
      twitter: this.state.twitter,
      instagram: this.state.instagram,
      facebook: this.state.facebook,
      youtube: this.state.youtube
    }
    this.props.createPersona(personaData, this.props.history);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render () {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={ this.state.twitter }
            onChange={ this.onChange }
            error={ errors.twitter }
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={ this.state.instagram }
            onChange={ this.onChange }
            error={ errors.instagram }
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={ this.state.facebook }
            onChange={ this.onChange }
            error={ errors.facebook }
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={ this.state.youtube }
            onChange={ this.onChange }
            error={ errors.youtube }
          />
          <InputGroup
            placeholder="Email"
            name="email"
            icon="fas fa-at"
            value={ this.state.email }
            onChange={ this.onChange }
            error={ errors.email }
          />
        </div>
      )
    }
    return (
      <div className="create-persona">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Persona</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={ this.onSubmit }>
                <TextFieldGroup
                  placeholder="* Persona name"
                  name="name"
                  value={ this.state.name }
                  onChange={ this.onChange }
                  error={ errors.name }
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={ () => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    } }
                    className="btn btn-light">
                    Add Social Network Links
                  </button>
                </div>
                { socialInputs }
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditPersona.propTypes = {
  persona: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentPersona: PropTypes.func.isRequired,
  createPersona: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  persona: state.persona,
  errors: state.errors
})

export default connect(mapStateToProps, { createPersona, getCurrentPersona })(withRouter(EditPersona));
