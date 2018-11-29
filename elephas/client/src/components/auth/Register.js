import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../rActions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordOk: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordOk: this.state.passwordOk
    }

    this.props.registerUser(newUser, this.props.history);

  }

  render() {
    const { errors } = this.state;
    document.body.style = 'background: #223843;';
    return (
      <div className="register back-indigo">
        <div className="container centered">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h3 className="display-4 text-center">Registre-se</h3>
              <p className="lead text-center">Crie seu Elephas</p>
              <form noValidate onSubmit={ this.onSubmit }>
                <TextFieldGroup
                  placeholder="Nome"
                  name="name"
                  value={ this.state.name }
                  onChange={ this.onChange }
                  error={ errors.name }
                  />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={ this.state.email }
                  onChange={ this.onChange }
                  error={ errors.email }
                  info="Este site usa Gravatar, logo, use um email cadastrado no Gravatar se quiser uma foto no perfil"
                  />
                  <TextFieldGroup
                    placeholder="Senha"
                    name="password"
                    type="password"
                    value={ this.state.password }
                    onChange={ this.onChange }
                    error={ errors.password }
                    />
                  <TextFieldGroup
                    placeholder="Confirme a Senha"
                    name="passwordOk"
                    type="password"
                    value={ this.state.passwordOk }
                    onChange={ this.onChange }
                    error={ errors.passwordOk }
                    />
                  <input type="submit" value="Registrar" className="btn btn-lg btn-block grey-blue mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
