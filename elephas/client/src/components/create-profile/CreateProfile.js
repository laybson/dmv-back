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
      <div className=" container centered">
        <p className="lead text-muted text-justify">Crie uma <b className="puce">Persona</b> para as pessoas
        que não podem ser esquecidas (todas).</p>
      <p className="lead text-muted text-justify">Escreva <b className="puce">Ações</b> para as atitudes.
        que essas pessoas tomaram para com você ou com o mundo.</p>
      <p className="lead text-muted text-justify"><b className="puce">Pontue</b> essas atitudes,
        positivamente ou negativamente, por nível de Bondade, e por nível do quando
        você Concorda com ela.</p>
      <p className="lead text-muted text-justify">O seu <b className="puce">Elephas</b> sugerirá quem você
        deveria abraçar e quem não parece merecer tanto sua atenção.</p>
        <p className="lead text-muted text-justify">Reflita, e não esqueça. Nunca.</p>
        <form onSubmit={ this.onSubmit }>
          <input type="submit" value="Começar >" className="btn btn-lg grey-blue-puce float-right"/>
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
