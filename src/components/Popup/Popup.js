import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PopupWrapper from './components/PopupWrapper';

// eslint-disable-next-line
class Popup extends Component {

  toggle = () => {
    this.props.callback();
    this.props.toggle();
  }

  render() {
    const {
      isOpen, children, title,
    } = this.props;

    return (
      <div>
        {isOpen && (
        <PopupContainer>
          <PopupWrapper toggle={this.toggle} title={title}>
            {children}
          </PopupWrapper>
        </PopupContainer>
        )}
      </div>
    );
  }
}

export default Popup;


Popup.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  callback: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Popup.defaultProps = {
  callback: () => {
    console.log('callback Popup');
  },
};

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255,255,255,0.7);
  z-index: 600;
`;
