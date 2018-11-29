import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../rActions/authActions';
import { clearCurrentProfile } from '../../rActions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profile;
    const personasLink = (profile && (Object.keys(profile).length <= 0) ? undefined : (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/personas">Personas</Link>
        </li>
      </ul>
    ))
    const authLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        { personasLink }
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="" onClick={this.onLogoutClick.bind(this)}>
              <img
                className="rounded-circle"
                src={ user.avatar }
                alt={ user.name }
                style={{ width: '25px', marginRight: '5px' }}
                title="You must have a gravatar connected to your email to display an image"
                />
              {' '}Logout
            </a>
          </li>
        </ul>
      </div>
    )

    const guestLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Registrar</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Entrar</Link>
          </li>
        </ul>
      </div>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark back-puce mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Elephas</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          { isAuthenticated ? authLinks : guestLinks }
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
