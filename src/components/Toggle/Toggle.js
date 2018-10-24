import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { iconToggle } from '../../../../assets/grab.svg';


const Toggle = props => (

  <button
    type="button"
    onClick={() => props.toggle()}
    className="toggle"
  >{props.children}
  </button>
);

export default Toggle;

Toggle.propTypes = {
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Toggle.defaultProps = {
  children: null,
};
