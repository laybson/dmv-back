import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../rActions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick (e) {
    this.props.deleteAccount();
  }

  render () {
    document.body.style = 'background: #fff;';
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent, deleteAccountButton;

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Olá, {profile.handle}! Bom te ver por aqui!
            </p>
            <ProfileActions />
          </div>
        );
        deleteAccountButton =
        (
          <button
            onClick={ this.onDeleteClick.bind(this) }
            className="btn btn-light cantin">
            <i className="fas fa-trash puce mr-1"></i>
            Excluir minha conta
          </button>
        )
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted text-justify">Olá, { user.name }!</p>
            <p className="lead text-muted text-justify">Elefantes são conhecidos por terem uma
            memória excelente, sendo capazes de memorizar vozes, aromas e atitudes
          por anos e anos. Mesmo após decadas sem contato, os elefantes
              agem com outros indivíduos de acordo com as atitudes que tiveram, como
              se nem um dia tivesse passado.</p>
            <p className="lead text-muted text-justify">Já os humanos são falhos!
            Com frequência se reaproximam de quem os fazem mal e relegam os que os amam.</p>
            <p className="lead text-muted text-justify">Com o seu <b className="puce">Elephas</b>,
              você será um pouco mais elefante. Alegria.</p>
            <Link to="/create-profile" className="btn btn-lg grey-blue-puce float-right">
              Avance >
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container  centered">
          <div className="row">
            <div className="col-md-12">
              { dashboardContent }
            </div>
          </div>
        </div>
        { deleteAccountButton }
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
