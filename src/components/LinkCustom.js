import React from 'react';
import PropTypes from 'prop-types';

const LinkCustom = ({ active, children, eventClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <button
      type="submit"
      href=""
      onClick={(e) => {
        e.preventDefault();
        eventClick();
      }}
    >
      {children}
    </button>
  );
};

LinkCustom.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  eventClick: PropTypes.func.isRequired,
};

LinkCustom.defaultProps = {
  active: false,
};

export default LinkCustom;
