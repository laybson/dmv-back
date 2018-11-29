import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  render() {    
    document.body.style = 'background: #223843;';
    return (
        <div className="landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center centered">
                <h1 className="display-3">Elephas
                </h1>
                <p className="lead"> Jamais esquecerá</p>
                <Link to="/register" className="btn btn-lg grey-blue">Registrar</Link>
                <Link to="/login" className="btn btn-lg grey-blue">Entrar</Link>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing);
