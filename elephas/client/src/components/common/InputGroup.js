import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup= ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  info,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={ icon } />
        </span>
      </div>
      <input
        className={ classnames('form-control form-control-lg',{
          'is-invalid': error
        })}
        placeholder={ placeholder }
        name={ name }
        value={ value }
        onChange={ onChange } />
      { info && <small className="form-text text-muted">{ info }</small> }
      { error && (<div className="invalid-feedback">{ error }</div>) }
    </div>
  )
}

InputGroup.propTypes = {
  info: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired
}

InputGroup.defaultProps = {
  type: "text"
}

export default InputGroup;
