import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../rActions/profileActions';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      personas: [],
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      profile.handle = !isEmpty(profile.handle) ? profile.handle : '';

      this.setState({
        handle: profile.handle,
        personas: profile.personas
      })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      personas: this.state.personas
    }
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render () {
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={ this.onSubmit }>
          <TextFieldGroup
            placeholder="* Your name"
            name="handle"
            value={ this.state.handle }
            onChange={ this.onChange }
            error={ errors.handle }
          />
          <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
        </form>
      </div>
    )
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
