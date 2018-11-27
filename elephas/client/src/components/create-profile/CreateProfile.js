import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../rActions/profileActions';
import { withRouter } from 'react-router-dom';

class CreateProfile extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    const { isAuthenticated, user } = this.props.auth;
    e.preventDefault();

    const profileData = {
      handle: user.name,
      personas: this.state.personas
    }
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render () {
    return (
      <div>
        <form onSubmit={ this.onSubmit }>
          <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
        </form>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
