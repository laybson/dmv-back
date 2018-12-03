import React, { Component } from 'react';
import PropTypes from 'prop-types';
import elephant from '../../img/elephant.jpg';
import isEmpty from '../../validation/is-empty';

class PersonaHeader extends Component {
  render () {
    const { persona } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="persona-header-card bg-card">
            <div className="col-2">
              <img
                src={ elephant } alt=""
                className="rounded-circle"
                style={{ maxHeight: '150px', maxWidth: '150px'}}/>
            </div>
            <div className="col-10">
              <p className="lead name-title">{ persona.name }</p>
              <div className="row">
                <div className="col-sm-6">
                  <i class="fas fa-yin-yang"></i>{' '}
                  Bondade:{' '}{ persona.gRating }</div>
                <div className="col-sm-6">
                  <i class="fas fa-magnet"></i>{' '}
                  Sintonia:{' '}{ persona.cRating }</div>
              </div>
              <div>
                <p class="social-links">
                  {isEmpty(persona.social && persona.social.twitter) ? null : (
                    <a className="p-2" href={persona.social.twitter} target="_blank">
                      <i className="fab fa-twitter social-ico"></i>
                    </a>
                  )}

                  {isEmpty(persona.social && persona.social.instagram) ? null : (
                    <a className="p-2" href={persona.social.instagram}>
                      <i className="fab fa-instagram social-ico"></i>
                    </a>
                  )}

                  {isEmpty(persona.social && persona.social.facebook) ? null : (
                    <a className="p-2" href={persona.social.facebook}>
                      <i className="fab fa-facebook social-ico"></i>
                    </a>
                  )}

                  {isEmpty(persona.social && persona.social.youtube) ? null : (
                    <a className="p-2" href={persona.social.youtube}>
                      <i className="fab fa-youtube social-ico"></i>
                    </a>
                  )}

                  {isEmpty(persona.social && persona.social.email) ? null : (
                    <a className="p-2" href={persona.social.email}>
                      <i className="fas fa-at social-ico"></i>
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PersonaHeader;
