import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
      <Link to="/create-persona" className="btn btn-light">
        <i className="fas fa-user text-info mr-1"></i>
        Create Persona</Link>
      {/*<Link to="/create-group" className="btn btn-light">
        <i className="fas fa-users text-info mr-1"></i>
        Create Group</Link>*/}
    </div>
  )
}

export default ProfileActions;
